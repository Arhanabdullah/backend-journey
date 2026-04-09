const express = require('express')
const route = express.Router()
const authMiddleware = require('../src/middlewares/auth.middleware')
const authController = require('../src/controllers/auth.controller')


route.post('/register', authMiddleware, authController.registerUser)
route.get('/fetchuser', authMiddleware, authController.fetchUser)
route.get('/refreshtoken', authMiddleware, authController.refreshToken)

module.exports = route