import asyncHandler from 'express-async-handler'
import Wishlist from '../models/wishlistModel.js'

// @desc   get clients wishlists
// @route  GET api/wishlist/
// @access Private
export const getWishlists = asyncHandler(async (req, res) => {
    const { userId } = req.params
    const clientsWishlist = await Wishlist.find({ userId }).populate('productId').populate('userId')
    res.status(200).json(clientsWishlist)
})

// @desc   create clients wishlist
// @route  POST api/wishlist/create
// @access Private
export const createWishlist = asyncHandler(async (req, res) => {
    const { userId, productId } = req.params
    const checkWish = await Wishlist.findOne({ productId })
    if (checkWish) {
        res.status(400)
        throw new Error('Already in your wishlist')
    }
    let newWishlist = new Wishlist({ userId, productId })
    newWishlist = await newWishlist.save()
    res.status(200).json(newWishlist)
    // res.json(req.params)
})