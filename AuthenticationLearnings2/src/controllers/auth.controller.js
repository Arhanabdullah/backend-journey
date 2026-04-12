const userModel = require('../models/user.model')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const sessionModel = require('../models/session.model')

async function registerUser(req, res) {

    const { username, email, password } = req.body

    
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
        refreshTokenHash: refreshTokenHash,
        ip: req.ip,
        userAgent: req.headers["user-agent"]
    })
    const accessToken = jwt.sign({
        userid: newUser._id,
        sessionId: session._id
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

async function loginUser(req, res) {
    
    
    const refreshToken = jwt.sign({
        id: isalreadyRegistered._id,
        username
    }, config.JWT_SECRET_KEY,
        {
            expiresIn: '7d'
        })
    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")

    const session = await sessionModel.create({
        userId: isalreadyRegistered._id,
        refreshTokenHash: refreshTokenHash,
        ip: req.ip,
        userAgent: req.headers["user-agent"]
    })
    const accessToken = jwt.sign({
        userid: isalreadyRegistered._id,
        sessionId: session._id
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
        message: "User Logged in Successfully",
        user: {
            name: isalreadyRegistered.username,
            email: isalreadyRegistered.email,
        },
        accessToken
    })

}

async function refreshToken(req, res) {


    await findSession.save(refreshTokenHash)
    await findSession.save()
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

async function logoutUser(req, res) {
    
    findSession.revoked = true;
    await findSession.save()

    res.clearCookie('refreshToken')

    res.status(200).json({ message: "Logged Out Successfully" })

}
module.exports = { registerUser, loginUser, refreshToken, logoutUser }