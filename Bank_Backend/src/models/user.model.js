const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email is already registered"],
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid Email address format"],
        lowercase: true,
        trim: true,
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username already exists"],
        match: [/^[a-zA-Z0-9]{3,20}$/, 'Please fill a valid username']
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password should atleast contain 6 characters"],
        select: false
    }
}, {
    timestamps: true
})

userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return
    }
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    return
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}


const userModel = mongoose.model("users", userSchema)

module.exports = userModel