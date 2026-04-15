const mongoose = require('mongoose')
const config = require('../config/config')

async function connectDB(){
    mongoose.connect(config.MONGO_URI)
    .then(()=>{
        console.log("Connected to Database: ", mongoose.connection.name);
        
    })
    .catch(err=>{
        console.log("Error connection to Database: ",err);
        process.exit(1)                     //if my db is not getting connected to the server then it will exit the program and no longer use the resources
    })
}


module.exports = connectDB