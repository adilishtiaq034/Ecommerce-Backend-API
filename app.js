const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
app.use(express.json())

mongoose.connect(process.env.mongodb_uri)
.then(()=>{
    console.log('Connected to MongoDB')
})
.catch((err)=>{
    console.error('Error connecting to MongoDB:', err)
})

app.listen(process.env.port, ()=>{
    console.log('Server has started running ')
})