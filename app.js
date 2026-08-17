const express = require('express')
const app = express()
app.use(express.json())
require('dotenv').config()
const mongoose = require('mongoose')
const multer = require('multer')
const upload = multer({dest : 'uploads/'})
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


app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)
app.post('/uploads', upload.single('image'), (req, res) => {
    console.log(req.file);
    res.json({ message: 'File uploaded successfully' });
});
app.use(errorMiddleware);

app.listen(process.env.port, ()=>{
    console.log('Server has started running ')
})