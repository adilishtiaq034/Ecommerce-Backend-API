const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const productRoutes = require('./routers/product-routes')
app.use(express.json())

mongoose.connect(process.env.mongodb_uri)
.then(()=>{
    console.log('Connected to MongoDB')
})
.catch((err)=>{
    console.error('Error connecting to MongoDB:', err)
})


app.use('/api/products', productRoutes)


app.listen(process.env.port, ()=>{
    console.log('Server has started running ')
})