const Product = require('../models/product-model')


const getAllProducts = async function (req, res, next) {

    try {
           const page = Number(req.query.page) || 1
           const limit = Number(req.query.limit) || 10
           const skip = (page-1)*limit
            const {category, minPrice, maxPrice,search,sort} = req.query;

          let filter={}

         if(search){
            filter.$or=[
                        {
                            name:{$regex:search,$options:'i'}
                        },
                        {
                            description:{$regex:search,$options:'i'}
                        }




          ] }

          if(category){
            filter.category = category
          }

        if(minPrice && maxPrice) {
            filter.price = {$gte: Number(minPrice), $lte: Number(maxPrice)}
          }
           
        else if(minPrice){
            filter.price = {$gte: Number(minPrice)}
          }
        else if(maxPrice){
            filter.price = {$lte: Number(maxPrice)}
          }

        let sortOption = {}
        if(sort === 'price') {
            sortOption.price = 1
        }
        else if(sort === '-price') {
            sortOption.price = -1
        }

        const products = await Product.find(filter).sort(sortOption).skip(skip).limit(limit)

        if (products.length === 0) {
            return res.status(404).json({
                message: 'No products has been found'
            })
        }

        res.status(200).json({
            message: 'Products has fetched successfully',
            products,
            page,
            limit
        })

    } catch (err) {

        next(err)

    }
}


const createProduct = async function (req, res, next) {

    try {

        const { name, price, description, category, stock } = req.body

        const product = await Product.create({
            name,
            price,
            description,
            category,
            stock
        })

        res.status(201).json({
            message: 'Product created successfully',
            product
        })

    } catch (err) {

        next(err)

    }
}


const getProductById = async function (req, res, next) {

    try {

        const id = req.params.id

        const product = await Product.findById(id)

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }

        res.status(200).json({
            message: 'Product fetched successfully',
            FetchedProduct: product
        })

    } catch (err) {

        next(err)

    }
}


const updateProduct = async function (req, res, next) {

    try {

        const id = req.params.id

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )

        if (!updatedProduct) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }

        res.status(200).json({
            message: 'Product updated successfully',
            updatedProduct
        })

    } catch (err) {

        next(err)

    }
}


const deleteProduct = async function (req, res, next) {

    try {

        const id = req.params.id

        const deletedProduct = await Product.findByIdAndDelete(id)

        if (!deletedProduct) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }

        res.status(200).json({
            message: 'Product deleted successfully',
            deletedProduct
        })

    } catch (err) {

        next(err)

    }
}


module.exports = {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
}