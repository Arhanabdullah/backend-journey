const express = require('express')
const authRoutes = require('./Routes/auth.routes')  


const app = express()


app.use(express.json())

app.use('/api/auth', authRoutes)
module.exports = app