import express from 'express'
import { verifyUser } from '../middleware/tokenMiddleware.js'
import { storeMessage } from '../controllers/messageController.js'

const router = express.Router()

router.post('/:userId', verifyUser, storeMessage)

export default router