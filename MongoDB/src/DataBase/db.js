const mongoose = require('mongoose')


async function connectDB(){

    await mongoose.connect("mongodb+srv://Backend:HTtyg0cB9DJgDVHr@backend.fwcqbtu.mongodb.net/PudinaLelo")

    console.log("DB is connected");
    
}

module.exports = connectDB