import express from 'express'
import { updateUser } from '../controllers/userController.js'
import { verifyUser } from '../middleware/tokenMiddleware.js'

const router = express.Router()

router.put('/:id', verifyUser, updateUser)

export default router