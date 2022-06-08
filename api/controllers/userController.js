import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'

// @desc   update user
// @route  PUT api/user/:id
// @access Private
export const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { name, email, old, new: pass, image } = req.body

    if (old) {
        const user = await User.findById(id)
        const hash = user.password
        const checkPassword = bcrypt.compareSync(old, hash);
        if (!checkPassword) {
            res.status(400)
            throw new Error('Old password is wrong')
        }
    }

    let thingsToUpdate = {}

    if (name) thingsToUpdate.name = name
    if (email) thingsToUpdate.email = email
    if (pass) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(pass, salt);
        thingsToUpdate.password = hash
    }
    if (image) {
        thingsToUpdate.image = image
    }

    const newUser = await User.findOneAndUpdate({ _id: id }, { $set: thingsToUpdate }, { new: true, runValidators: true })

    res.status(200).json(newUser)
})