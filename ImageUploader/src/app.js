const express = require('express')
const app = express()
const multer = require('multer')
const uploadImage = require('./Services/storage.service')
const postModel = require ('./DB/models/post.models')


app.use(express.json())
const upload = multer({storage: multer.memoryStorage()})

app.post('/create-post', upload.single('image'), async (req,res)=>{

    console.log(req.body);
    console.log(req.file);
    
    const result = await uploadImage(req.file.buffer)

    console.log(result);
    const post = await postModel.create({
        image: result.url,
        caption: req.body.caption

    })

    res.status(201).json({
        message: "Post created successfully ",
        post
    })
})

app.get('/posts', async (req,res)=>{
    const posts= await postModel.find()

    return res.status(200).json({
        message: "Posts Fetched Successfully",
        posts
    })

})




module.exports = app