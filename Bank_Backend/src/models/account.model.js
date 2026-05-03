const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, "Account must be associated with a user"],
        index: true
    },
    status: {
        enum: {
            values: ['active', 'frozen', 'closed'],
            message: "Status must be either active, frozen or closed"
        },
        type: String,
        default: 'active'
    },
    currency: {
        type: String,
        required: [true, "Currency is required for creating an account"],
        uppercase: true,
        default: "INR"
    }
}, {
    timestamps: true
})
accountSchema.index({ user: 1, status: 1 })

const accountModel = mongoose.model("accounts", accountSchema)

module.exports = accountModel