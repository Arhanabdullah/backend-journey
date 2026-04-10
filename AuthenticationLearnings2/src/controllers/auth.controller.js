const userModel = require('../models/user.model')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const sessionModel = require('../models/session.model')

async function registerUser(req, res) {

    const { username, email, password } = req.body

    const isalreadyRegistered = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })
    if (isalreadyRegistered) {
        return res.status(409).json({ message: "Username or email already exists" })
    }

    const hashedPassword = crypto.createHash("sha256").update(password).digest('hex')

    const newUser = await userModel.create({
        username,
        email,
        password: hashedPassword
    })
    const refreshToken = jwt.sign({
        id: newUser._id,
        username
    }, config.JWT_SECRET_KEY,
        {
            expiresIn: '7d'
        })
    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")

    const session = await sessionModel.create({
        userId: newUser._id,
        refreshToken: refreshTokenHash,
        ip: req.ip,
        userAgent: req.headers["user-agent"]
    })
    const accessToken = jwt.sign({
        id: newUser._id,
        username
    }, config.JWT_SECRET_KEY,
        {
            expiresIn: '15m'
        })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,                             //httpOnly and secure client side ke js se token access hone nhi deta
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.status(201).json({
        message: "User Created Successfully",
        user: {
            name: newUser.username,
            email: newUser.email,
        },
        accessToken
    })

}

async function fetchUser(req, res) {

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token Not Found" })
    const decoded = jwt.verify(token, config.JWT_SECRET_KEY)
    const user = await userModel.findById(decoded.id)

    res.status(200).json({
        message: "User Fetched Successfully",
        user: {
            username: user.username,
            email: user.email

        }
    })

}

async function refreshToken(req, res) {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.status(401).json({ message: "Refresh Token not Found" })

    const decoded = jwt.verify(refreshToken, config.JWT_SECRET_KEY)

    const newrefreshToken = jwt.sign({
        id: decoded.id,
        username: decoded.username
    }, config.JWT_SECRET_KEY, {
        expiresIn: "7d"
    })

    res.cookie('refreshToken', newrefreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 //7days in ms
    })

    const accessToken = jwt.sign({
        id: decoded.id,
        username: decoded.username
    }, config.JWT_SECRET_KEY, {
        expiresIn: "15m"
    })

    return res.status(200).json({ message: "Access Token Refreshed Successfully", accessToken })
}
module.exports = { registerUser, fetchUser, refreshToken }