const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

async function register(req, res) {
    const { name, email, password } = req.body

    const alreadyExist = await userModel.findOne({ email })

    if (alreadyExist) {
        return res.status(400).json({ message: 'User already exists' })
    }
    const user = await userModel.create({
        name,
        email,
        password
    })
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
        if (err) {
            return res.status(500).json({ message: 'Error generating token' })
        }        user.token = token
    })
    
    await user.save()

    res.status(201).json({ message: 'User created successfully' ,
        accessToken
    })

}