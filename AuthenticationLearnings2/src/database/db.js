const mongoose = require('mongoose')
const config = require('../config/config')


async function connectDB(){
    await mongoose.connect(config.MONGO_URI)
    .then(()=>{
        console.log("Connected to Database: ", mongoose.connection.name);
        
    })
    .catch((err)=>{
        console.log(err);
        
    })
}

module.exports = connectDB