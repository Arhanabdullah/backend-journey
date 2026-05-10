const accountModel = require('../models/account.model');


async function createAccount(req, res) {

    const user = req.user

    const account = await accountModel.create({
        user: user._id,
    })
    const findUserAccounts = await accountModel.find({ user: user._id })
    if(findUserAccounts){
        return res.status(400).json({
            message: 'User already has an account'
        })
    }
    res.status(201).json({
        account
    })
}

async function getAccounts(req, res) {

    const user = req.user

    const accounts = await accountModel.find({ user: user._id })
    res.status(200).json({
        accounts
    })
}


module.exports = { createAccount, getAccounts }