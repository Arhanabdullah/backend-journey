const express = require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const accountController = require('../controllers/account.controller')

const router = express.Router()

/**
 * - POST /api/
 * - Create a new account for the authenticated user
 * - Protected route, requires authentication
 */

router.post('/', authMiddleware.authMiddleware, accountController.createAccount)

module.exports = router