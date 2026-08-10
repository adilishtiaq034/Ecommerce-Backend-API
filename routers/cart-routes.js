const express =  require('express')
const router = express.Router()

const {addToCart,getcart,removeFromCart} = require('../controllers/cart-controller');
const authmiddleware = require('../middlewares/auth-middleware')

router.post('/add',authmiddleware,addToCart)
router.get('/get',authmiddleware,getcart)
router.delete('/remove/:productId',authmiddleware,removeFromCart)
router.put('/update/:productId',authmiddleware,updateCart)




module.exports = router









