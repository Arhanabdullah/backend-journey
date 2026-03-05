// app.js is used to create and initiate the express app and export it to be used in other files like server.js

const express = require("express")

const app = express()

app.use(express.json()) // to parse the incoming request body as JSON

const notes = []

app.post('/notes', (req, res) => {
    notes.push(req.body)
    res.status(201).json({
        message: "Note created successfully"
    })
})

app.get('/notes', (req, res) => {
    res.status(200).json({
        notes: notes,
        message: "Notes Fetched Successfully"
    })
})

app.delete('/notes/:index', (req, res) => {
    const index = req.params.index
    delete notes[index]
    res.status(200).json({
        message: "Note Deleted Successfully"
    })
})



app.patch('/notes/:index', (req, res) => {
    const index = req.params.index
    const description = req.body.Description 
    notes[index].Description = description

    res.status(200).json({
        message: "Note Updated Successfully"
    })

})
module.exports = app