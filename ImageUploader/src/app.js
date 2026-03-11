const express = require('express')
const app = express()
const multer = require('multer')
const uploadImage = require('./Services/storage.service')

app.use(express.json())
const upload = multer({storage: multer.memoryStorage()})
app.post('/create-post', upload.single('image'), async (req,res)=>{

    console.log(req.body);
    console.log(req.file);
    
    const result = await uploadImage(req.file.buffer)

    console.log(result);
    
})






module.exports = app