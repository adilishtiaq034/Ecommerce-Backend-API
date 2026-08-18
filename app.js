const express = require('express')
const app = express()
app.use(express.json())
const helmet = require('helmet')
app.use(helmet())
const cors = require('cors')
app.use(cors())
const rateLimit = require('express-rate-limit')
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // maximum 100 requests per windowMs
})
app.use(limiter)
require('dotenv').config()
const mongoose = require('mongoose')
const multer = require('multer')
const authRoutes = require('./routers/auth-routes')
const productRoutes = require('./routers/product-routes')
const cartRoutes = require('./routers/cart-routes')
const orderRoutes = require('./routers/order-routes')
const errorMiddleware = require('./middlewares/error-middleware')


mongoose.connect(process.env.mongodb_uri)
.then(()=>{
    console.log('Connected to MongoDB')
})
.catch((err)=>{
    console.error('Error connecting to MongoDB:', err)
})

app.use('/uploads', express.static('uploads'));
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)

app.use(errorMiddleware);

app.listen(process.env.port, ()=>{
    console.log('Server has started running ')
})