import express from 'express'
import { updateUser, allUsers, deleteUser } from '../controllers/userController.js'
import { verifyUser, verifyAdmin } from '../middleware/tokenMiddleware.js'

const router = express.Router()

router.get('/', verifyAdmin, allUsers)
router.route('/:id')
    .put(verifyUser, updateUser)
    .delete(verifyAdmin, deleteUser)

export default router