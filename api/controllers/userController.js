import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'

// @desc   update user
// @route  PUT api/user/:id
// @access Private
export const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { name, email, oldPass, newPass, image } = req.body

    if (oldPass) {
        const user = await User.findById(id)
        const hash = user.password
        const checkPassword = bcrypt.compareSync(oldPass, hash);
        if (!checkPassword) {
            res.status(400)
            throw new Error('Old password is wrong')
        }
    }

    let thingsToUpdate = {}

    if (name) thingsToUpdate.name = name
    if (email) thingsToUpdate.email = email
    if (newPass) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPass, salt);
        thingsToUpdate.password = hash
    }
    if (image) {
        thingsToUpdate.image = image
    }

    const newUser = await User.findOneAndUpdate({ _id: id }, { $set: thingsToUpdate }, { new: true, runValidators: true })
    const { password, isAdmin, ...other } = newUser._doc
    const token = req.cookies.access_token
    res.cookie('access_token', token, {
        httpOnly: true,
        expires: new Date(new Date().getTime() + (86409000 / 15))
    })
    res.cookie('clientData', JSON.stringify(other), {
        expires: new Date(new Date().getTime() + (86409000 / 15))
    })
    res.status(200).json(other)
})