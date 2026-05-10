const transactionModel = require('../models/transaction.model');
const accountModel = require('../models/account.model')
const ledgerModel = require('../models/ledger.model')
const emailService = require('../services/email.service')
const mongoose = require('mongoose')

const createTransaction = async (req, res) => {

    /**
     * - Validate request
     */
    const { toAccount, fromAccount, amount, idempotencyKey } = req.body

    if (!toAccount || !fromAccount || !amount || !idempotencyKey) {
        return res.status(400).json({
            message: "All fields are required",
            status: "Failed"
        })
    }
    const fromUserAccount = await accountModel.findOne({
        _id: fromAccount
    })
    const toUserAccount = await accountModel.findOne({
        _id: toAccount
    })

    if (!fromUserAccount || !toUserAccount) {
        return res.status(400).json({
            message: "From account or to account not found",
            status: "Failed"
        })
    }

    /**
     * - Validate Idempotency key
     */
    const existingTransaction = await transactionModel.findOne({
        idempotencyKey
    })
    if (existingTransaction) {
        if (existingTransaction.status === 'completed') {
            return res.status(200).json({
                message: "Transaction already completed",
                status: "Success",
                transaction: existingTransaction
            })
        }
        if (existingTransaction.status === 'pending') {
            return res.status(200).json({
                message: "Transaction is still pending",
                status: "Pending",
                transaction: existingTransaction
            })
        }
        if (existingTransaction.status === 'failed') {
            return res.status(500).json({
                message: "Transaction already failed",
                status: "Failed",
                transaction: existingTransaction
            })
        }
        if (existingTransaction.status === 'reversed') {
            return res.status(500).json({
                message: "Transaction already reversed",
                status: "Reversed",
                transaction: existingTransaction
            })
        }
    }

    /**
     * - Check Account status
     */
    if (fromUserAccount.status !== 'active' || toUserAccount.status !== 'active') {
        return res.status(500).json({
            message: "Either of the accounts is not active",
            status: "Failed"
        })
    }

    /**
     * - Check Sufficient balance
     */

    const balance = await fromUserAccount.getBalance()
    if (balance < amount) {
        return res.status(500).json({
            message: "Insufficient balance in from account",
            status: "Failed"
        })
    }

    /**
     * - Create Transaction
     */
    const session = await mongoose.startSession()
    session.startTransaction()
    const transaction = await transactionModel.create({
        toAccount,
        fromAccount,
        amount,
        idempotencyKey,
        status: 'pending'
    }, { session })

    const debitLedgerEntry = await ledgerModel.create({
        account: fromAccount,
        type: 'debit',
        amount,
        transaction: transaction._id
    }, { session })

    const creditLedgerEntry = await ledgerModel.create({
        account: toAccount,
        type: 'credit',
        amount,
        transaction: transaction._id
    }, { session })

    transaction.status = 'completed'
    await transaction.save({ session })

    await session.commitTransaction()
    session.endSession()


    /**     * - Send email notification
     */

    await emailService.sendTransactionEmail(fromUserAccount.email, fromUserAccount.username, amount, 'debit')
    await emailService.sendTransactionEmail(toUserAccount.email, toUserAccount.username, amount, 'credit')
    res.status(200).json({
        message: "Transaction completed successfully",
        status: "Success",
        transaction
    })
}

async function createInitialFundsTransaction(req, res) {
    const { toAccount, amount, idempotencyKey } = req.body
    if (!toAccount || !amount || !idempotencyKey) {
        throw new Error("All fields are required")
    }
    const toUserAccount = await accountModel.findOne({
        _id: toAccount
    })
    if (!toUserAccount) {
        res.status(400).json({
            message: "To account not found",
            status: "Failed"
        })
    }
    console.log(req.user._id);
    
    const fromAccount = await accountModel.findOne({
        user: req.user._id,
    })
    console.log(fromAccount);
    
    if (!fromAccount) {
        res.status(400).json({
            message: "From account not found",
            status: "Failed"
        })
    }
    const session = await mongoose.startSession()
    session.startTransaction()
    const transaction = new transactionModel({
        toAccount,
        fromAccount: fromAccount._id,
        amount,
        idempotencyKey,
        status: 'pending'
    }, )

    const debitLedgerEntry = await ledgerModel.create([{
        account: fromAccount._id,
        type: 'debit',
        amount,
        transaction: transaction._id
    }], { session })

    const creditLedgerEntry = await ledgerModel.create([{
        account: toAccount,
        type: 'credit',
        amount,
        transaction: transaction._id
    }], { session })

    transaction.status = 'completed'
    await transaction.save({ session })

    await session.commitTransaction()
    session.endSession()


    /**   
     *  - Send email notification
     */

    await emailService.sendTransactionEmail(fromAccount.email, fromAccount.username, amount, 'debit')
    await emailService.sendTransactionEmail(toAccount.email, toAccount.username, amount, 'credit')
    res.status(200).json({
        message: "Initial funds transaction completed successfully",
        status: "Success",
        transaction
    })
}


module.exports = { createTransaction, createInitialFundsTransaction } 