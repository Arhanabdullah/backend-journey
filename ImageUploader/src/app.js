const express = require('express')
const app = express()
const multer = require('multer')

app.use(express.json())
const upload = multer({storage: multer.memoryStorage()})
app.post('/create-post', upload.single('image'), (req,res)=>{

    console.log(req.body);
    console.log(req.file);
    
    
})






module.exports = app