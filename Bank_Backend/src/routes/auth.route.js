const express = requrire('express');
const router = express.Router();
const authController = require('../controllers/auth.controller')

router.post('/register', authController.register)

module.exports = router;