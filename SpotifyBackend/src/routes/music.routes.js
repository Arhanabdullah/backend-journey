const express = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const musicController = require('../controllers/music.controller')
const route = express.Router()
const multer = require('multer')

const upload = multer({
    storage: multer.memoryStorage()
})

route.post('/upload', authMiddleware.authArtist, upload.single('music'), musicController.createMusic)
route.post('/album', musicController.createAlbum)


module.exports = route