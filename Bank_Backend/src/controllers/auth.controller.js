const userModel = require('../models/user.model')

async function register(req, res) {
    const { name, email, password } = req.body

    const alreadyExist = await userModel.findOne({ email })

    if (alreadyExist) {
        return res.status(400).json({ message: 'User already exists' })
    }
    const user = new userModel({
        name,
        email,
        password
    })
    await user.save()
    res.status(201).json({ message: 'User created successfully' })

}