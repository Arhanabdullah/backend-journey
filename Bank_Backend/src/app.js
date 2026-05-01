const express = require('express')
const cookie = require("cookie-parser")
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const authRoute = require('./routes/auth.route')
const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoute)

module.exports= app