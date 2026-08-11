
const Cart = require('../models/cart-model')
const Product = require('../models/product-model')
const Order = require('../models/order-model')

const createorder = async function(req, res) {

    const userId = req.user.userId

    const cartItems = await Cart.find({ userId })

    if (cartItems.length === 0) {
        return res.status(400).json({
            message: "Cart is empty. Please add products to the cart before placing an order."
        })
    }

    let totalPrice = 0
    const orderProducts = []

    for (const items of cartItems) {

        const product = await Product.findById(items.productId)

        if (!product) {
            return res.status(404).json({
                message: `Product with ID ${items.productId} not found.`
            })
        }

        orderProducts.push({
            productId: items.productId,
            quantity: items.quantity,
            price: product.price
        })

        totalPrice += product.price * items.quantity
    }

    const order = await Order.create({
        userId,
        products: orderProducts,
        totalPrice
    })

    await Cart.deleteMany({ userId })

    res.status(201).json({
        message: 'Order created successfully',
        order: order
    })
}

const getOrders = async function(req, res) {

    const userId = req.user.userId

    const orders = await Order.find({ userId })

    res.status(200).json({
        message: 'Orders found',
        orders
    })
}

module.exports = { createorder, getOrders }