const express = require('express')
const route = express.Router()
// const authMiddleware = require('../src/middlewares/auth.middleware')
const authController = require('../src/controllers/auth.controller')


route.post('/register', authController.registerUser)
route.get('/fetchuser', authController.fetchUser)
route.get('/refreshtoken', authController.refreshToken)

module.exports = route