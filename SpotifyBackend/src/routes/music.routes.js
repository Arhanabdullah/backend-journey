const express = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const musicController = require('../controllers/music.controller')
const route = express.Router()
const multer = require('multer')

const upload = multer({
    storage: multer.memoryStorage()
})

route.post('/upload', authMiddleware.authArtist, upload.single('music'), musicController.createMusic)
route.post('/album', authMiddleware.authArtist, musicController.createAlbum)
route.get('/', authMiddleware.authUser, musicController.getAllMusic)
route.get('/albums', authMiddleware.authUser, musicController.getAllAlbums)
route.get('/albums/:albumId', authMiddleware.authUser, musicController.getAlbumById)


module.exports = route