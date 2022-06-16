import express from 'express'
import { verifyUser, verifyAdmin } from '../middleware/tokenMiddleware.js'
import { storeMessage, allMessages } from '../controllers/messageController.js'

const router = express.Router()

router.post('/:userId', verifyUser, storeMessage)
router.get('/', verifyAdmin, allMessages)

export default router