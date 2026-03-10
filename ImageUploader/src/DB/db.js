const mongoose = require('mongoose')
require("dotenv").config()

async function connectDB() {

    await mongoose.connect(process.env.Mongo_URI)

    console.log("DB is connected");

}

module.exports = connectDB


