const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

async function register(req, res) {
    const { name, email, password } = req.body

    const alreadyExist = await userModel.findOne({ email })

    if (alreadyExist) {
        return res.status(422).json({ message: 'User already exists', status: "Failed" })
    }
    const user = await userModel.create({
        name,
        email,
        password
    })
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',  
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 
        })
    

    await user.save()

    res.status(201).json({
        user:{
            _id: user._id,
            name: user.name,
            email: user.email
        },
        message: 'User created successfully',
        status: "Success", accessToken
    })

} 

async function login(req, res) {
    const { email, password } = req.body    
    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(404).json({ message: 'User not found', status: "Failed" })
    }   
    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials', status: "Failed" })
    }   
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',  
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 
        })
    }

