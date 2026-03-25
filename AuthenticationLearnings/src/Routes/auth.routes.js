const express = require('express')
const authController = require('../Controllers/auth.controller')
const router = express.Router()

router.post('/register', authController.registerUser)
router.get('/test', (req,res)=>{
    console.log("Cookies", req.cookies);
    res.json({
        message: 'Test route accessed successfully',
        cookies: req.cookies
    })
    
})



module.exports = router