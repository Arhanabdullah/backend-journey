const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const config = require('../config/config')


async function authMiddleware(req, res, next) {
    const token = req.cookies.accessToken || req.headers['authorization']?.split(' ')[1]
    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized: No token provided',
            status: "Failed"
        })
    }
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET_KEY)
        const user = await userModel.findById(decoded.id)
        if (!user) {
            return res.status(401).json({
                message: 'Unauthorized: Invalid token',
                status: "Failed"
            })
        }
        req.user = user
        return next()
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized: Invalid token',
            status: "Failed"
        })
    }

}

async function authSystemUserMiddleware(req, res, next) {

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access, token is missing"
        })
    }

    const isBlacklisted = await tokenBlackListModel.findOne({ token })

    if (isBlacklisted) {
        return res.status(401).json({
            message: "Unauthorized access, token is invalid"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.userId).select("+systemUser")
        if (!user.systemUser) {
            return res.status(403).json({
                message: "Forbidden access, not a system user"
            })
        }
        req.user = user
        return next()
    }
    catch (err) {
        return res.status(401).json({
            message: "Unauthorized access, token is invalid"
        })
    }

}

module.exports = { authMiddleware, authSystemUserMiddleware }