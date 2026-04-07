const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username must be unique"]
    },
    email: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username must be unique"]
    },
    password: {
        type: String,
    }
})
const userModel = mongoose.model("user", userSchema)

module.exports = userModel