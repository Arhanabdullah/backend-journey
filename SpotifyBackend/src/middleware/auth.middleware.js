const jwt = require('jsonwebtoken')

async function authArtist(req, res, next) {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: "Unauthorized Access" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (decoded.role !== 'artist') {
            return res.status(403).json({ message: "Forbidden Access" })
        }
        req.user = decoded
        next()
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized Access" })
    }
}
async function authUser(req, res, next) {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: "Unauthorized Access" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (decoded.role !== 'user') {
            return res.status(403).json({ message: "Forbidden Access" })
        }
        req.user = decoded
        next()
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized Access" })
    }
}

module.exports = { authArtist, authUser }