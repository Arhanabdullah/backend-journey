const userModel = require('../models/user.model')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const sessionModel = require('../models/session.model')
const otpModel = require('../models/otp.model')
const { sendEmail, verify } = require('../services/email.service')
const { generateOtp, generateOtpHtml } = require('../utils/utils')

async function registerUser(req, res) {

    const { username, email, password } = req.body
    const hashedPassword = crypto.createHash("sha256").update(password).digest('hex')
    const newUser = await userModel.create({
        username,
        email,
        password: hashedPassword
    })
    const otp = generateOtp()
    const html = generateOtpHtml(otp)
    const otpHash = crypto.createHash('sha256').update(otp).digest('hex')
    await otpModel.create({
        email,
        userId: newUser._id,
        otpHash
    })

    await sendEmail(email, ` Your OTP for account verification ${otp}`, html)
    res.status(201).json({
        message: "User Created Successfully",
        user: {
            name: newUser.username,
            email: newUser.email,
            verified: newUser.verified
        }
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

async function verifyOtp(req, res) {
    const { email, otp } = req.query
    const otpHash = crypto.createHash('sha256').update(otp).digest('hex')
    const findOtp = await otpModel.findOne({ email, otpHash })
    if (!findOtp) {
        return res.status(400).json({ message: "Invalid OTP" })
    }
    const user = await userModel.findByIdAndUpdate(findOtp.userId, { verified: true })
    if (!user) {
        return res.status(400).json({ message: "No user found for this OTP" })
    }
    await otpModel.deleteMany({ email }) //otp verify hone ke baad otp delete kr dena chahiye security ke liye
    res.status(200).json({
        message: "Email Verified Successfully", 
        user: {
            name: user.username,
            email: user.email,
            verified: user.verified
        }
    })
}
module.exports = { registerUser, loginUser, refreshToken, logoutUser, verifyOtp }