const express = require('express')
const validationMiddleware = require('./middlewares/validation.middleware')

const app = express()
app.use(express.json())
app.post('/register',validationMiddleware.registerUserValidationRules, (req, res) => {
    const { username, email, password } = req.body

    res.status(200).json({ message: "User registered successfully", user: { username, email } })
})

module.exports = app