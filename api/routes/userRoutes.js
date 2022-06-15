import express from 'express'
import { updateUser, allUsers } from '../controllers/userController.js'
import { verifyUser, verifyAdmin } from '../middleware/tokenMiddleware.js'

const router = express.Router()

router.get('/', verifyAdmin, allUsers)
router.put('/:id', verifyUser, updateUser)

export default router