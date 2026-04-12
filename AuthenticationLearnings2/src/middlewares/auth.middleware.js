const jwt = require('jsonwebtoken')
const config = require('../config/config')

async function createUser(req, res, next) {

    const isalreadyRegistered = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (isalreadyRegistered) {
        return res.status(409).json({ message: "Username or email already exists" })
    }
    next()

}

async function authenticateUser(req, res, next) {
    const { username, password } = req.body
    const isalreadyRegistered = await userModel.findOne({ username })


    if (!isalreadyRegistered) {
        return res.status(409).json({ message: "No user exists!!!" })
    }
    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")
    if (hashedPassword !== isalreadyRegistered.password) {
        return res.status(401).json({ message: "Invalid Credentials" })
    }
    next()
}

async function refreshTokenCheck(req, res, next) {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.status(401).json({ message: "Refresh Token not Found" })
    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest('hex')

    const findSession = await sessionModel.findOne({
        refreshTokenHash,
        revoked: false
    })

    if (!findSession) return res.status(401).json({ message: "Invalid Refresh Token" })
    next()
}


module.exports = { createUser, authenticateUser, refreshTokenCheck }