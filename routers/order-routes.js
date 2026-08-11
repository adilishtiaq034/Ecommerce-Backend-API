const express = require('express')
const router = express.Router()

const { createorder } = require('../controllers/order-controller')
const authmiddleware = require('../middlewares/auth-middleware')

router.post('/create', authmiddleware, createorder)

module.exports = router