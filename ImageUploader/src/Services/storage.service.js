const ImageKit =  require("@imagekit/nodejs")
require("dotenv").config()

const imagekit = new ImageKit({
    privateKey: process.env.ImageKit_privateKey
})

async function uploadImage(buffer){
    console.log(buffer);
    
    const result = await imagekit.files.upload({
        file: buffer.toString("base64"),
        fileName: "Image.jpg"
    })
    return result
}

module.exports = uploadImage;