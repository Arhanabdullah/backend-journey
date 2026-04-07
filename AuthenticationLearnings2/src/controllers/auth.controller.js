const userModel = require('../models/user.model')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

async function registerUser(req, res) {

    const { username, email, password } = req.body

    const isalreadyRegistered = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })
    if (isalreadyRegistered) {
        return res.status(409).json({ message: "Username or email already exists" })
    }

    const hashedPassword = crypto.createHash("sha256").update(password).digest('hex')

    const newUser = await userModel.create({
        username,
        email,
        password: hashedPassword
    })
    const token = jwt.sign({
        id: newUser._id,
        username
    }, config.JWT_SECRET_KEY,
        {
            expiresIn: '1d'
        })

    res.status(201).json({
        message: "User Created Successfully",
        user: {
            name: newUser.username,
            email: newUser.email,
        },
        token
    })

}

module.exports = registerUser