const express = require('express')
const router = express.Router()

const { createorder,getOrders, getOrderById,cancelOrder,updateOrderStatus} = require('../controllers/order-controller')
const authmiddleware = require('../middlewares/auth-middleware')
const adminmiddleware = require('../middlewares/admin-middleware')

router.post('/create', authmiddleware, createorder)
router.get('/get', authmiddleware, getOrders)
router.get('/:id', authmiddleware, getOrderById)
router.put('/:id/cancel', authmiddleware, cancelOrder)
router.patch('/:id/cancel', authmiddleware, cancelOrder)
router.patch('/:id/status', authmiddleware, adminmiddleware, updateOrderStatus)
module.exports = router