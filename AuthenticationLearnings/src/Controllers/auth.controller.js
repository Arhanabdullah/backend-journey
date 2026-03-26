const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
require("dotenv").config()
async function registerUser(req, res) {

    const { username, email, password } = req.body

    const ifUserExists = await userModel.findOne({
        email
    })
    if (ifUserExists) {
        return res.status(409).json({
            message: "User already exists"
        })
    }
    const user = await userModel.create({
        username,
        email,
        password
    })

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET_KEY)

    res.cookie('token', token)
    res.status(201).json({
        message: 'User registered successfully',
        user
    })
}


module.exports = { registerUser }