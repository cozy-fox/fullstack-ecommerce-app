import asyncHandler from 'express-async-handler'
import Cart from '../models/cartModel.js'
import Wishlist from '../models/wishlistModel.js'
import Product from '../models/productModel.js'

// @desc   get Items from cart
// @route  GET api/cart/:userId
// @access Private
export const getCart = asyncHandler(async (req, res) => {
    const userId = req.user.id
    const clientsCart = await Cart.find({ userId })
    res.status(200).json(clientsCart)
})

// @desc   create clients cart
// @route  POST api/cart/:userId
// @access Private
export const createCart = asyncHandler(async (req, res) => {
    const userId = req.user.id
    const { productName, productPrice, productImage, productSlug, quantity } = req.body

    const checkCart = await Cart.countDocuments({ userId, productSlug })
    if (checkCart) {
        res.status(400)
        throw new Error('Already in your cart')
    }

    await Wishlist.deleteOne({ userId, productSlug })

    // await Product.updateOne({ slug: productSlug }, { $inc: { inStock: -quantity } })

    let cartItem = new Cart({ userId, productSlug, productName, productPrice, productImage, quantity })
    cartItem = await cartItem.save()
    res.status(200).json(cartItem)
})