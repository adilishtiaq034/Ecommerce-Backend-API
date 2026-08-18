const express = require('express');
const router = express.Router()
const validateProduct = require('../middlewares/product-validator')
const {getAllProducts,createProduct,getProductById,updateProduct,deleteProduct} = require('../controllers/product-controller')
const authmiddleware = require('../middlewares/auth-middleware')
const adminmiddleware = require('../middlewares/admin-middleware')
const upload = require('../middlewares/upload-middleware')

router.get('/', authmiddleware, getAllProducts) 
router.post('/', authmiddleware, adminmiddleware, upload.array('images', 5), validateProduct, createProduct)
router.get('/:id', authmiddleware, getProductById)
router.put('/:id', authmiddleware, adminmiddleware, updateProduct)
router.delete('/:id', authmiddleware, adminmiddleware, deleteProduct)


 
module.exports = router  