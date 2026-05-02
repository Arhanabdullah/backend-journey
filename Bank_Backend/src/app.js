const express = require('express')
const cookie = require("cookie-parser")
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
/**
 * - Importing routes
 */
const authRoute = require('./routes/auth.route')
const accountRoute = require('./routes/account.route')

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

/**
 * - Routes
 */
app.use('/api/auth', authRoute)
app.use('/api/accounts',authMiddleware.authMiddleware, accountRoute)

module.exports= app