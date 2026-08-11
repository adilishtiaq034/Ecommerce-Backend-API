const Order = require('../models/order-model')
const Cart = require('../models/cart-model')
const Product = require('../models/product-model')


// CREATE ORDER
const createorder = async function (req, res) {

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
        order
    })
}


// GET ALL ORDERS
const getOrders = async function (req, res) {

    const userId = req.user.userId

    const orders = await Order.find({ userId })

    if (orders.length === 0) {
        return res.status(404).json({
            message: 'No orders found'
        })
    }

    res.status(200).json({
        message: 'Orders found',
        orders
    })
}


// GET ONE ORDER
const getOrderById = async function(req, res) {

    const userId = req.user.userId
    const orderId = req.params.id

    const order = await Order.findOne({
        _id: orderId,
        userId
    })

   

    if (!order) {
        return res.status(404).json({
            message: 'Order not found'
        })
    }

    res.status(200).json({
        message: 'Order found',
        order
    })
}
 const cancelOrder = async function (req, res) {

    const userId = req.user.userId
    const orderId = req.params.id

    const order = await Order.findOne({
        _id: orderId,
        userId
    })

    if (!order) {
        return res.status(404).json({
            message: "Order not found or you are not allowed to cancel it"
        })
    }

    if (order.status !== 'pending') {
        return res.status(400).json({
            message: `Order cannot be cancelled because its status is ${order.status}`
        })
    }

    order.status = 'cancelled'

    await order.save()

    res.status(200).json({
        message: "Order cancelled successfully",
        order
    })
}
const updateOrderStatus = async function (req, res) {

    const orderId = req.params.id
    const { status } = req.body

    const order = await Order.findById(orderId)

    if (!order) {
        return res.status(404).json({
            message: 'Order not found'
        })
    }

    const allowedStatuses = [
        'pending',
        'confirmed',
        'shipped',
        'delivered',
        'cancelled'
    ]

    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
            message: 'Invalid order status'
        })
    }

    // Status transition rules
    if (order.status === 'pending' && status !== 'confirmed' && status !== 'cancelled') {
        return res.status(400).json({
            message: 'Pending order can only be confirmed or cancelled'
        })
    }

    if (order.status === 'confirmed' && status !== 'shipped' && status !== 'cancelled') {
        return res.status(400).json({
            message: 'Confirmed order can only be shipped or cancelled'
        })
    }

    if (order.status === 'shipped' && status !== 'delivered') {
        return res.status(400).json({
            message: 'Shipped order can only be delivered'
        })
    }

    if (order.status === 'delivered') {
        return res.status(400).json({
            message: 'Delivered order cannot be changed'
        })
    }

    if (order.status === 'cancelled') {
        return res.status(400).json({
            message: 'Cancelled order cannot be changed'
        })
    }

    order.status = status

    await order.save()

    res.status(200).json({
        message: 'Order status updated successfully',
        order
    })
}

module.exports = {
    createorder,
    getOrders,
    getOrderById,
    cancelOrder,
    updateOrderStatus
}
    
    