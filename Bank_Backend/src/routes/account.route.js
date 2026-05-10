const express = require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const accountController = require('../controllers/account.controller')

const router = express.Router()

/**
 * - POST /api/accounts/
 * - Create a new account for the authenticated user
 * - Protected route, requires authentication
 */

router.post('/', authMiddleware.authMiddleware, accountController.createAccount)

/**
 * - GET /api/accounts/
 * - Get all accounts for the authenticated user
 * - Protected route, requires authentication
 */

router.get('/', authMiddleware.authMiddleware, accountController.getAccounts)

module.exports = router