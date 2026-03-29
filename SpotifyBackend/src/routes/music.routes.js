const express = require('express')
const musicController = require('../controllers/music.controller')
const route = express.Router()

route.post('/upload', musicController.createMusic)


module.exports = route