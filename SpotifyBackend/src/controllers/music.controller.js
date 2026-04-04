const musicModel = require('../models/music.model')
const albumModel = require('../models/album.model')
const { uploadFile } = require('../services/storage.service')

async function createMusic(req, res) {

    const { title } = req.body
    const file = req.file
    const result = await uploadFile(file.buffer.toString('base64'))
    const newMusic = await musicModel.create({
        uri: result.url,
        title,
        artist: req.user.id
    })
    res.status(201).json({
        message: "Music created successfully",
        newMusic
    })
}
async function createAlbum(req, res) {
    const { title, musics } = req.body
    const album = await albumModel.create({
        title,
        artist: req.user.id,
        musics: musics
    })
    res.status(201).json({
        message: "Album Created Successfully",
        album: {
            id: album._id,
            title: album.title,
            artist: album.artist,
            music: album.musics
        }
    })
}

async function getAllMusic(req, res) {
    const musics = await musicModel
        .find()
        .limit(2)
        .populate('artist')

    return res.status(200).json({
        message: "Musics Fetched SUccessfully",
        musics
    })
}

async function getAllAlbums(req, res) {
    const albums = await albumModel
        .find()
        .limit(2)
        .populate('musics')
        .populate('artist')
    return res.status(200).json({
        message: "Albums fetched Successfully",
        albums
    })
}
async function getAlbumById(req, res) {
    const albumId = req.params.albumId
    const albums = await albumModel
        .findById(albumId)
        .limit(2)
        .populate('musics')

    return res.status(200).json({
        message: "Albums fetched Successfully",
        albums
    })
}

module.exports = { createMusic, createAlbum, getAllMusic, getAllAlbums, getAlbumById }