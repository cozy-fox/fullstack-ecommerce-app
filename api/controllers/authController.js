import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// @desc   Register user
// @route  POST api/auth/register
// @access Public
export const registerUser = asyncHandler(async (req, res) => {
    const { userIdForUpdate } = req.query

    if (userIdForUpdate) {
        await User.findByIdAndUpdate(userIdForUpdate, { $set: { image: req.body.image } })
        res.status(200).json('successfully updated image')
    }

    if (!req.body.name || !req.body.email || !req.body.password) {
        res.status(400)
        throw new Error('Please fill all the input fields')
    }

    const checkUser = await User.countDocuments({ 'email': req.body.email })
    if (checkUser) {
        res.status(400)
        throw new Error('User already exists')
    }

    const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/fullstack-ecommerce-f3adb.appspot.com/o/guest.webp?alt=media&token=da29d69d-0134-4b56-a295-55b348de4cbe'

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        image: defaultImage
    })

    newUser = await newUser.save()
    res.status(201).json({ userId: newUser._id })
})

// @desc   Login user
// @route  POST api/auth/login
// @access Public
export const loginUser = asyncHandler(async (req, res) => {
    const { email, pass } = req.body

    if (!email || !pass) {
        res.status(400)
        throw new Error('Please fill all the input fields')
    }

    const user = await User.findOne({ email })
    if (!user) {
        res.status(400)
        throw new Error('Invalid email')
    }

    const hash = user.password
    const checkPassword = bcrypt.compareSync(pass, hash);
    if (!checkPassword) {
        res.status(400)
        throw new Error('Password is wrong')
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET)

    const { password, isAdmin, ...other } = user._doc
    res.cookie('access_token', token, {
        httpOnly: true,
        expires: new Date(new Date().getTime() + (86409000 / 15))
    })
    res.cookie('clientData', JSON.stringify(other), {
        expires: new Date(new Date().getTime() + (86409000 / 15))
    })
    res.status(200).json(other)
})

export const logoutUser = (req, res) => {
    res.clearCookie('access_token')
    res.clearCookie('clientData')
    res.status(200).json({ message: 'successfully logged out' })
}