const express = require('express');
const noteModel = require('./Models/note.model')

const app = express();
app.use(express.json())


app.post('/notes', async (req, res) => {
    const data = req.body
    await noteModel.create({
        title: data.title,                  //data.title is case sensitive and should match the key in the request body
        description: data.description        //data.description is case sensitive and should match the key in the request body
    })
    res.status(201).json({
        message: 'Note created Successfully'
    })
})

app.get('/notes', async (req, res) => {
    const notes = await noteModel.find()            //find() method is used to get all the data from the database and it returns an array of objects
    res.status(200).json({
        message: 'Notes fetched Successfully',
        notes: notes
    })
}
)
app.get('/notes', async (req, res) => {
    const notes = await noteModel.findOne({
        title: 'Arhan'
    })            //findOne() method is used to get a single document from the database and it returns an object. If there are multiple documents in the database, it will return the first document that matches the query and if there is no document that matches the query, it will return null.
    res.status(200).json({
        message: 'Notes fetched Successfully',
        notes: notes
    })
})


app.delete('/notes/:id', async (req, res) => {
    const id = req.params.id
    await noteModel.findByIdAndDelete(id)          //findByIdAndDelete() method is used to delete a document from the database by its id and it returns the deleted document. If there is no document that matches the id, it will return null.
    res.status(200).json({
        message: 'Note deleted Successfully'
    })
})

app.patch('/notes/:id', async (req, res) => {
    const id = req.params.id
    const description = req.body.description
    await noteModel.findByIdAndUpdate({ _id: id }, {        //findByIdAndUpdate() method is used to update a document in the database by its id and it returns the updated document. If there is no document that matches the id, it will return null.
        description: description
    })
    res.status(200).json({
        message: 'Note updated Successfully'
    })
})

module.exports = app