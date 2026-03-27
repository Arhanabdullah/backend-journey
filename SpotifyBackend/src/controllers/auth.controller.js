const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
async function registerUser() {

    const { username, email, password, role = 'user' } = req.body;

    const userAlreadyExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (userAlreadyExists) {
        return res.status(409).json({ message: "User Already exists!" })
    }

    const newUser = await userModel.create({
        username,
        email,
        password,
        role
    })

    const token = jwt.sign({
        id: newUser._id,
        role: newUser.role
    }, process.env.JWT_SECRET_KEY)

    res.cookie('token',token)


    res.status(201).json({
        message: "User Registered Successfully",
        newUser,
        


    })
}