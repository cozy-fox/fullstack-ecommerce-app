import express from 'express'
import { createProduct, getProducts, getProduct, deleteProduct } from '../controllers/productController.js'
import { verifyAdmin } from '../middleware/tokenMiddleware.js';

const router = express.Router()

router.get('/', getProducts)
router.get('/:slug', getProduct)
router.post('/create', verifyAdmin, createProduct)
router.delete('/:productId', verifyAdmin, deleteProduct)

export default router