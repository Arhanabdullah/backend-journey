const mongoose = require('mongoose')
const ledgerModel = require('./ledger.model')

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

accountSchema.methods.getBalance = async function () {
    const ledgerData = await ledgerModel.aggregate([
        {
            $match: {
                account: this._id
            },
            $group: {
                _id: null,
                totalDebit: {
                    $sum: {
                        $cond: [
                            { $eq: ["$type", "debit"] },
                            "$amount",
                            0
                        ]
                    }
                },
                totalCredit: {
                    $sum: {
                        $cond: [
                            { $eq: ["$type", "credit"] },
                            "$amount",
                            0
                        ]
                    }
                }
            },
            $project: {
                _id: 0,
                balance: { $subtract: ["$totalCredit", "$totalDebit"] }
            }
        }
    ])
    if (ledgerData.length === 0) {
        return 0
    }
    return ledgerData[0].balance
}

const accountModel = mongoose.model("accounts", accountSchema)

module.exports = accountModel