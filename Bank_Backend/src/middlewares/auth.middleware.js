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
        next()
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized: Invalid token',
            status: "Failed"
        })
    }

}

module.exports = { authMiddleware }