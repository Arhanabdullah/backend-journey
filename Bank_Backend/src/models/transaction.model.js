const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({

    fromAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'accounts',
        required: true
    },
    toAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'accounts',
        required: true
    },
    status: {
        type: String,
        enum: {
            values: ['pending', 'completed', 'failed'],
            message: "Status must be either pending, completed or failed"
        },
        default: 'pending'
    },
    amount: {
        type: Number,
        required: [true, "Amount is required for a transaction"],
        min: [0, "Amount must be a positive number"]
    },
    idempotencyKey: {
        type: String,
        required: [true, "Idempotency key is required for a transaction"],
        index: true,
        unique: true
    }
}, {
    timestamps: true
})

const transactionModel = mongoose.model("transactions", transactionSchema)

module.exports = transactionModel