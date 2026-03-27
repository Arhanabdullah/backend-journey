const mongoose = require('mongoose')
require('dotenv').config


async function connectDB() {

    await mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("DB is connected", mongoose.connection.name);

        })
        .catch((err) => {
            console.log("error connecting DB", err);
        })


}

module.exports = connectDB