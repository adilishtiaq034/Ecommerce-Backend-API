const Product = require('../models/product-model')


const getAllProducts = async function (req, res, next) {

    try {

        const products = await Product.find()

        if (products.length === 0) {
            return res.status(404).json({
                message: 'No products found'
            })
        }

        res.status(200).json({
            message: 'Products fetched successfully',
            products
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