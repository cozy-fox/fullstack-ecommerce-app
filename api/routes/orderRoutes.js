import express from 'express'
import { createOrder, getOrders } from '../controllers/orderControllers.js'
import { verifyUser } from '../middleware/tokenMiddleware.js'

const router = express.Router()

router.route('/:userId')
    .get(verifyUser, getOrders)
    .post(verifyUser, createOrder)

export default router