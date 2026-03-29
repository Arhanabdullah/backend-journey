require('dotenv').config()
const express = require("express")
const cookieParser = require("cookie-parser")
const authRoutes = require('./routes/auth.routes')
const musicRoutes = require('./routes/music.routes')
const multer = require('multer')


const upload = multer({
    storage: multer.memoryStorage()
})


const app = express()
app.use(cookieParser())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/music', upload.single('music'), musicRoutes)


module.exports = app
