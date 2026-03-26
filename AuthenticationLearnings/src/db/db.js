const mongoose = require('mongoose')
require("dotenv").config()
async function ConnectDB() {

    await mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("DB connected:", mongoose.connection.name)
        })
        .catch(err => console.log(err))
}

module.exports = ConnectDB