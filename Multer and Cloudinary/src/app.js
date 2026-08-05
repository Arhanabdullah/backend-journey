const express = require('express')
const morgan = require('morgan')
const router = require('../routes/auth.routes')
const cookieParser = require('cookie-parser')

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', router)
module.exports = app