import express from 'express'
import { createProduct, getProducts } from '../controllers/productController.js'
import { verifyAdmin } from '../middleware/tokenMiddleware.js';

const router = express.Router()

router.get('/', getProducts)
router.post('/create', verifyAdmin, createProduct)

export default router