import express from 'express'
import { getWishlists, createWishlist } from '../controllers/wishlistController.js'
import { verifyUser } from '../middleware/tokenMiddleware.js'

const router = express.Router()

router.get('/:userId', verifyUser, getWishlists)
router.get('/:userId/:productId', verifyUser, createWishlist)

export default router