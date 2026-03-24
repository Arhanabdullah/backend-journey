const app = require('./src/app')
const ConnectDB = require('./src/db/db')
require('dotenv').config()



ConnectDB()
app.listen(3000,()=>{
    console.log("Server is running in port 3000");
    
})