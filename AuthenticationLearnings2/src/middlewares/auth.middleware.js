const jwt = require('jsonwebtoken')
const { token } = require('morgan')

async function authUser(req,res,next){

    const token = res.cookies.token
    if(!token){
        return res.status(403).json({message: "Unauthorized"})
    }

    
}