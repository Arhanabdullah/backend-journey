const app = require('./src/app')
const connectDB = require('./src/config/db')

connectDB()

app.listen(3000,()=>{"Server is running on port 3000"})


