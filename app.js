const express = require('express')
const app = express()
app.use(express.json())
const helmet = require('helmet')
app.use(helmet())
require('dotenv').config()
const mongoose = require('mongoose')
const multer = require('multer')
const upload = multer({dest : 'uploads/',
                       limits: { fileSize: 5*1024*1024},
                       fileFilter:(req,file,cb)=>{
                        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/webp'){
                          cb(null, true);
                        } else {
                          cb( new Error('Invalid file type'), false);
                        }
                      }
})
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
app.post('/', upload.array('images', 5),(req, res) => {
    console.log(req.files);
    res.json({ message: 'File uploaded successfully' });
});
app.use(errorMiddleware);

app.listen(process.env.port, ()=>{
    console.log('Server has started running ')
})