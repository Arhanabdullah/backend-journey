const transactionModel = require('../models/transaction.model');
const accountModel = require('../models/account.model')
const ledgerModel = require('../models/ledger.model')
const emailService = require('../services/email.service')

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
}
