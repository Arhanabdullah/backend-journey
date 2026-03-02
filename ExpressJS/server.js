const express = require('express');

const app = express()
app.get('/', (req, res) => {
    res.send("Hello World")
})
app.listen(3000)

// GET => server se data fetch krna ho tbb use krte h
// POST => server me data send krna ho tbb use krte h
// PATCH => server me data already h aur uss data ko update krna ho toh patch use krte h
// DELETE => server me data already h aur uss data ko delete krna ho 