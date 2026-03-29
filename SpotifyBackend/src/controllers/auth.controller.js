const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


async function registerUser(req, res) {

    const { username, email, password, role } = req.body;

    const userAlreadyExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (userAlreadyExists) {
        return res.status(409).json({ message: "User Already exists!" })
    }
    const hash = await bcrypt.hash(password, 10)

    const newUser = await userModel.create({
        username,
        email,
        password: hash,
        role
    })

    const token = jwt.sign({
        id: newUser._id,
        role: newUser.role
    }, process.env.JWT_SECRET_KEY)

    res.cookie('token', token)


    res.status(201).json({
        message: "User Registered Successfully",
        newUser: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
        }
    })
}


async function loginUser(req, res) {

    const { username, password, email, role } = req.body;

    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })
    if (!user) {
        return res.status(401).json({ message: "Invalid Credentials" })
    }
    const passwordValid = await bcrypt.compare(password, user.password)

    if (!passwordValid) {
        return res.status(401).json({ message: "Invalid Credentials" })
    }

    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET_KEY)

    res.cookie('token', token)
    res.status(200).json({
        message: "Login Successful",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        }

    })
}

module.exports = { registerUser, loginUser }