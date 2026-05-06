const mongoose = require('mongoose')


const ledgerSchema = new mongoose.Schema({

    account:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'accounts',
        required: [true, "Account reference is required for a ledger entry" ],
        index: true,
        immutable: true

    },
    amount:{
        type: Number,
        required: [true, "Amount is required for a ledger entry"],
        min: [0, "Amount must be a positive number"],
        immutable: true
    },
    transaction:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'transactions',
        required: [true, "Transaction reference is required for a ledger entry"],
        index: true,
        immutable: true
    },
    type:{
        type: String,
        enum: {
            values: ['debit', 'credit'],
            message: "Type can only be either debit or credit"
        },
        required: [true, "Type is required for a ledger entry"],
        immutable: true
    }
},{
    timestamps: true
})

const preventLedgerModification = ()=>{
    throw new Error("Ledger entries cannot be modified or deleted")
    }


ledgerSchema.pre('findOneAndUpdate', preventLedgerModification)
ledgerSchema.pre('updateOne', preventLedgerModification)
ledgerSchema.pre('deleteOne', preventLedgerModification)
ledgerSchema.pre('deleteMany', preventLedgerModification)
ledgerSchema.pre('updateMany', preventLedgerModification)
ledgerSchema.pre('findOneAndDelete', preventLedgerModification)
ledgerSchema.pre('findOneAndRemove', preventLedgerModification)
ledgerSchema.pre('remove', preventLedgerModification)
ledgerSchema.pre('findOneAndUpdate', preventLedgerModification)
ledgerSchema.pre('findOneAndReplace', preventLedgerModification)

const ledgerModel = mongoose.model("ledgers", ledgerSchema)

module.exports = ledgerModel