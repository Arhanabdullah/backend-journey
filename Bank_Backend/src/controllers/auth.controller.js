const userModel = require('../models/user.model')
const blacklistModel = require('../models/blacklist.model')
const config = require('../config/config')
const jwt = require('jsonwebtoken')
const emailService = require('../services/email.service')
const bcrypt = require('bcrypt')
/** 
 * - user register controller
 * - POST /api/auth/register
*/
async function register(req, res) {
    const { username, email, password } = req.body

    const alreadyExist = await userModel.findOne({ email })
    if (alreadyExist) {
        return res.status(422).json({
            message: 'User already exists',
            status: "Failed"
        })
    }
    const user = await userModel.create({
        username,
        email,
        password
    })

    const accessToken = jwt.sign({
        id: user._id
    }, config.JWT_SECRET_KEY, {
        expiresIn: '1d'
    })

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000
    })
    await user.save()

    res.status(201).json({
        user: {
            _id: user._id,
            username: user.username,
            email: user.email
        },
        message: 'User created successfully',
        status: "Success",
        accessToken
    })
    await emailService.sendRegistrationEmail(user.email, user.username)
}

/**
 * - user login controller
 * - POST /api/auth/login
 */

async function login(req, res) {
    const { email, password } = req.body
    const user = await userModel.findOne({ email }).select("+password")

    if (!user) {
        return res.status(404).json({
            message: 'User not found',
            status: "Failed"
        })
    }
    const isValidPassword = await user.comparePassword(password)

    if (!isValidPassword) {
        return res.status(401).json({
            message: 'Invalid credentials',
            status: "Failed"
        })
    }
    const accessToken = jwt.sign({ id: user._id }, config.JWT_SECRET_KEY, { expiresIn: '1d' })
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000
    })

    res.status(200).json({
        user: {
            _id: user._id,
            email: user.email,
            username: user.username
        },
        accessToken
    })
}
/** 
 * - user logout controller
 * - POST /api/auth/logout
*/
async function logout(req, res) {
    const token = req.cookies.accessToken || req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.status(400).json({
            message: 'No token provided',
            status: "Failed"
        })
    }
    await blacklistModel.create({
        token 
    })
    res.clearCookie('accessToken')
    res.status(200).json({
        message: 'Logged out successfully',
        status: "Success"
    })
}

module.exports = { register, login, logout } 