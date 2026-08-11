const mongoose = require('mongoose')
const Order = require('../models/order-model')
const Cart = require('../models/cart-model')
const Product = require('../models/product-model')


const createorder = async function (req, res, next) {

    const session = await mongoose.startSession()

    try {

        session.startTransaction()

        const userId = req.user.userId

        const cartItems = await Cart.find({ userId }).session(session)

        if (cartItems.length === 0) {
            await session.abortTransaction()

            return res.status(400).json({
                message: "Cart is empty. Please add products to the cart before placing an order."
            })
        }

        let totalPrice = 0
        const orderProducts = []

        for (const items of cartItems) {

            const product = await Product.findById(items.productId).session(session)

            if (!product) {
                await session.abortTransaction()

                return res.status(404).json({
                    message: `Product with ID ${items.productId} not found.`
                })
            }

            if (items.quantity > product.stock) {
                await session.abortTransaction()

                return res.status(400).json({
                    message: `Not enough stock for ${product.name}`
                })
            }

            orderProducts.push({
                productId: items.productId,
                quantity: items.quantity,
                price: product.price
            })

            totalPrice += product.price * items.quantity

            
            product.stock -= items.quantity

            await product.save({ session })
        }

        const order = await Order.create(
            [{
                userId,
                products: orderProducts,
                totalPrice
            }],
            { session }
        )

        await Cart.deleteMany(
            { userId },
            { session }
        )

        await session.commitTransaction()

        res.status(201).json({
            message: 'Order created successfully',
            order: order[0]
        })

    } catch (err) {

        await session.abortTransaction()

        next(err)

    } finally {

        session.endSession()

    }
}


const getOrders = async function (req, res, next) {

    try {

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

    } catch (err) {

        next(err)
    }
}


const getOrderById = async function (req, res, next) {

    try {

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

    } catch (err) {

        next(err)
    }
}


const cancelOrder = async function (req, res, next) {

    const session = await mongoose.startSession()

    try {

        session.startTransaction()

        const userId = req.user.userId
        const orderId = req.params.id

        const order = await Order.findOne({
            _id: orderId,
            userId
        }).session(session)

        if (!order) {
            await session.abortTransaction()

            return res.status(404).json({
                message: "Order not found or you are not allowed to cancel it"
            })
        }

        if (order.status !== 'pending') {
            await session.abortTransaction()

            return res.status(400).json({
                message: `Order cannot be cancelled because its status is ${order.status}`
            })
        }

        
        for (const item of order.products) {

            const product = await Product.findById(item.productId)
                .session(session)

            if (product) {
                product.stock += item.quantity

                await product.save({ session })
            }
        }

       
        order.status = 'cancelled'

        await order.save({ session })

        await session.commitTransaction()

        res.status(200).json({
            message: "Order cancelled successfully",
            order
        })

    } catch (err) {

        await session.abortTransaction()

        next(err)

    } finally {

        session.endSession()

    }
}


const updateOrderStatus = async function (req, res, next) {

    try {

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

        if (
            order.status === 'pending' &&
            status !== 'confirmed' &&
            status !== 'cancelled'
        ) {
            return res.status(400).json({
                message: 'Pending order can only be confirmed or cancelled'
            })
        }

        if (
            order.status === 'confirmed' &&
            status !== 'shipped' &&
            status !== 'cancelled'
        ) {
            return res.status(400).json({
                message: 'Confirmed order can only be shipped or cancelled'
            })
        }

        if (
            order.status === 'shipped' &&
            status !== 'delivered'
        ) {
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

    } catch (err) {

        next(err)
    }
}


module.exports = {
    createorder,
    getOrders,
    getOrderById,
    cancelOrder,
    updateOrderStatus
}