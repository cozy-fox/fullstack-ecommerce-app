import asyncHandler from 'express-async-handler'
import Message from '../models/contactModel.js'
import User from '../models/userModel.js'

// @desc   Storing message
// @route  POST api/message/:userId
// @access Private
export const storeMessage = asyncHandler(async (req, res) => {
    const { name, email, number, message } = req.body
    const id = req.user.id
    const user = await User.findById(id)
    if (!user || user.email !== email) {
        res.status(400)
        throw new Error('Invalid mail address')
    }
    const storeMessage = new Message({ name, email, number, message })
    await storeMessage.save()
    res.status(201).json({ message: 'Successfully sent' })
})