const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required:[true, "User ID is required"]
    },
    refreshTokenHash: {
        type: String,
        required:[true, "Refresh Token is required"]
    },
    ip: {
        type: String,
        required:[true, "IP Address is required"]
    },
    revoked: {
        type: Boolean,
        default: false
    },
    userAgent: {
        type: String,
        required:[true, "User Agent is required"],
        ref:"user"
    }
})

const sessionModel = mongoose.model('session', sessionSchema)


module.exports = sessionModel