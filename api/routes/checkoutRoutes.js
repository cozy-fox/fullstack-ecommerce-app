import express from 'express'
import { verifyUser } from '../middleware/tokenMiddleware.js'
import { checkout } from '../controllers/checkoutController.js'

const router = express.Router()

router.post('/:userId', checkout)

export default router