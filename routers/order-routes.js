const express = require('express')
const router = express.Router()

const { createorder,getOrders } = require('../controllers/order-controller')
const authmiddleware = require('../middlewares/auth-middleware')

router.post('/create', authmiddleware, createorder)
router.get('/get', authmiddleware, getOrders)

module.exports = router