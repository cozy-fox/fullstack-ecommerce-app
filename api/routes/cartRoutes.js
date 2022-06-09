import express from 'express'
import { verifyUser } from '../middleware/tokenMiddleware.js'
import { createCart, getCart } from '../controllers/cartController.js'

const router = express.Router()

router.route('/:userId')
    .get(verifyUser, getCart)
    .post(verifyUser, createCart)

export default router