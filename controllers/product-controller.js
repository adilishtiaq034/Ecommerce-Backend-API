const Product = require('../models/product-model');


const getAllProducts = async function(req,res){
 
try{
  const products = await Product.find()
  if(products.length ==0){
    return res.status(404).json({
        message: 'No products found'
    })
  }
   res.status(200).json({
     message: 'Products fetched successfully',
     products: products
   })
} 
 catch(err){
    res.status(500).json({
        message: 'Error fetching products',
        error: err
    })
}}

const createProduct = async function(req,res){

const {name, price, description,category,stock} = req.body

try{
     const product = await Product.create({
        name: name,
        price: price,
        description: description,
        category: category,
        stock: stock
     })

     res.status(201).json({
        message: 'Product created successfully',
        product: product
     })}
     
 catch(err){
    res.status(500).json({
        message: 'Error creating product',
        error: err
    })
}}


































module.exports = {
    getAllProducts,
    createProduct
}