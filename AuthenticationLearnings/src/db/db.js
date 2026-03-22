const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
async function ConnectDB() {
    await mongoose.connect(process.env.MONGO_URI)
    
    console.log("Connected to MongoDB");
    
}

module.exports = ConnectDB