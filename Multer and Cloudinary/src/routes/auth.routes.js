const express = require('express')
const route = express.Router()
const authMiddleware = require('../src/middlewares/auth.middleware')
const authController = require('../src/controllers/auth.controller')


route.post('/register', authMiddleware.createUser, authController.registerUser)
route.get('/login', authMiddleware.authenticateUser, authController.loginUser)
route.get('/refreshtoken', authMiddleware.refreshTokenCheck, authController.refreshToken)
route.get('/logout', authMiddleware.refreshTokenCheck, authController.logoutUser)
route.get('/verify-otp', authController.verifyOtp)

module.exports = route