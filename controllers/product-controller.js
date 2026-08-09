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

module.exports = {
    getAllProducts
}