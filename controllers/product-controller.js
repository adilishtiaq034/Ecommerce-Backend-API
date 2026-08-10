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
        message: err.message
        
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
        message: err.message
    })
}}

const getProductById = async function (req,res){

   const id = req.params.id

   try{
        const product = await Product.findById(id)

        if(!product){
            return res.status(404).json({
                message: 'Product not found'
            })
        }

        res.status(200).json({
            message: 'Product fetched successfully',
            FetchedProduct: product
        })
   }
      catch(err){
        res.status(500).json({
             message: err.message  
        }) }
}

const updateProduct = async function(req,res){

  const id = req.params.id
  try{
       const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {new: true})
       if(!updatedProduct){
        return res.status(404).json({
            message: 'Product not found'
        })
       }
       res.status(200).json({
        message: 'Product updated successfully',
        updatedProduct: updatedProduct
       })}

  catch(err){
    res.status(500).json({
         message: err.message
        
    })}
 }

const deleteProduct = async function(req,res){
    const id = req.params.id

    try{
        const deletedProduct = await Product.findByIdAndDelete(id)

        if(!deletedProduct){
            return res.status(404).json({
                message: 'Product not found'
            })
        }

        res.status(200).json({
            message: 'Product deleted successfully',
            deletedProduct: deletedProduct
        })
    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}


module.exports = {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
}