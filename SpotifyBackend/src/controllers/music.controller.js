const musicModel = require('../models/music.model')
const { uploadFile } = require('../services/storage.service')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

async function createMusic(req, res) {
    const token = req.cookies.token; 
    if (!token) {
        return res.status(401).json({ message: "Unauthorized access" })
    }
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (decoded.role !== 'artist') {
            return res.status(403).json({ message: "Forbidden access" })
        }
        const { title } = req.body
        const file = req.file

        const result = await uploadFile(file.buffer.toString('base64'))
        const newMusic = await musicModel.create({
            uri: result.url,
            title,
            artist: decoded.id
        })

        res.status(201).json({
            message: "Music created successfully",
            newMusic
        })
    }

    catch (error) {
        console.log(error);
        
        return res.status(401).json({ message: "Unauthorized access" })
    }
}

module.exports = { createMusic }