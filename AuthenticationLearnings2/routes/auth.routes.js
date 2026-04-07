const express = require('express')
const route = express.Router()
const authMiddleware = require('../src/middlewares/auth.middleware')
const authController = require('../src/controllers/auth.controller')


route.post('/register', authMiddleware, authController.registerUser)

module.exports = route