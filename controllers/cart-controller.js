const Cart = require('../models/cart-model')
const Product = require('../models/product-model')


const addToCart = async function (req, res, next) {

    try {

        const userId = req.user.userId

        const { productId, quantity = 1 } = req.body

        const product = await Product.findById(productId)

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }

        const cartItem = await Cart.findOne({
            userId,
            productId
        })

        if (cartItem) {

            cartItem.quantity += quantity

            await cartItem.save()

        } else {

            await Cart.create({
                userId,
                productId,
                quantity
            })
        }

        res.status(200).json({
            message: 'Product added to cart successfully'
        })

    } catch (err) {

        next(err)

    }
}


const getcart = async function (req, res, next) {

    try {

        const userId = req.user.userId

        const cartItems = await Cart.find({ userId })

        if (cartItems.length === 0) {
            return res.status(404).json({
                message: 'Cart is empty'
            })
        }

        res.status(200).json({
            message: 'Cart found',
            cart: cartItems
        })

    } catch (err) {

        next(err)

    }
}


const removeFromCart = async function (req, res, next) {

    try {

        const userId = req.user.userId

        const { productId } = req.params

        const cartItem = await Cart.findOne({
            userId,
            productId
        })

        if (!cartItem) {
            return res.status(404).json({
                message: 'Item not found in cart'
            })
        }

        await cartItem.deleteOne()

        res.status(200).json({
            message: 'Item removed from cart successfully'
        })

    } catch (err) {

        next(err)

    }
}


const updateCart = async function (req, res, next) {

    try {

        const userId = req.user.userId

        const { productId } = req.params
        const { quantity } = req.body

        const cartItem = await Cart.findOne({
            userId,
            productId
        })

        if (!cartItem) {
            return res.status(404).json({
                message: 'Item not found in cart'
            })
        }

        cartItem.quantity = quantity

        await cartItem.save()

        res.status(200).json({
            message: 'Cart quantity updated successfully',
            cartItem
        })

    } catch (err) {

        next(err)

    }
}


module.exports = {
    addToCart,
    getcart,
    removeFromCart,
    updateCart
}