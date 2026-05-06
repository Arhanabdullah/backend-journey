const express = require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const transactionController = require('../controllers/transaction.controller')

const router = express.Router()

/**
 * - POST /api/transactions
 * - Create a new transaction for the authenticated user
 * - Protected route, requires authentication
 */
router.post('/', authMiddleware.authMiddleware, transactionController.createTransaction)

module.exports = router