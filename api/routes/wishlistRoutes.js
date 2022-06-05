import express from 'express'
import { getWishlists, createWishlist, deleteProduct } from '../controllers/wishlistController.js'
import { verifyUser } from '../middleware/tokenMiddleware.js'

const router = express.Router()

router.route('/:userId')
    .get(verifyUser, getWishlists)
    .post(verifyUser, createWishlist)

router.delete('/:userId/:wishId', verifyUser, deleteProduct)

export default router