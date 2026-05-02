const express = require('express')
const authMiddleware = require('./middlewares/auth.middleware')

const router = express.Router()

/**
 * - POST /api/accounts/
 * - Create a new account for the authenticated user
 * - Protected route, requires authentication
 */

router.post('/accounts', authMiddleware.authMiddleware)

module.exports = router