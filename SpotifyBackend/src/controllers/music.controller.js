const musicModel = require('../models/music.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

async function createMusic(req, res) {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ message: "Unauthorized access" })
    }
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (decoded.role !== 'artist') {
            return res.status(403).json({ message: "Forbidden access" })

        }
    }

    catch (error) {
        return res.status(401).json({ message: "Unauthorized access" })
    }
}