const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const authRoutes = require('./routers/auth-routes')
const productRoutes = require('./routers/product-routes')
const cartRoutes = require('./routers/cart-routes')
const orderRoutes = require('./routers/order-routes')
app.use(express.json())

mongoose.connect(process.env.mongodb_uri)
.then(()=>{
    console.log('Connected to MongoDB')
})
.catch((err)=>{
    console.error('Error connecting to MongoDB:', err)
})

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)


app.listen(process.env.port, ()=>{
    console.log('Server has started running ')
})