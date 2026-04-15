const express = require('express')
require('dotenv').config()
const cookie = require("cookie-parser")
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

module.exports= app