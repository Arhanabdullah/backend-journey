const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
    email:{
        type: String,
        required:[true, "Email is required"]
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required:[true, "User ID is required"],
        ref: 'User'
    }, 
    otpHash:{
        type: String,
        required:[true, "OTP hash is required"]
    }
})