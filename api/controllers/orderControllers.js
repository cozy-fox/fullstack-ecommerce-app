import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import Cart from '../models/cartModel.js'
import Product from '../models/productModel.js'

// @desc   get clients order
// @route  GET api/order/:userId
// @access Private
export const getOrders = asyncHandler(async (req, res) => {
    const userId = req.user.id
    const orders = await Order.find({ userId }).sort({ createdAt: -1 })
    res.status(200).json(orders)
})

// @desc   create clients order
// @route  POST api/order/:userId
// @access Private
export const createOrder = asyncHandler(async (req, res) => {
    const userId = req.user.id
    const { name, email, number, address, orders, totalPrice, deliveryStatus, paymentInfo, productIds, cartProducts } = req.body

    await Promise.all(cartProducts.map(product => (
        Product.updateOne({ slug: product.productSlug }, { $inc: { inStock: -product.quantity } })
    )))

    await Cart.deleteMany({ _id: { $in: productIds } })

    let newOrder = new Order({ userId, name, email, number, address, orders, totalPrice, deliveryStatus, paymentInfo })
    newOrder = await newOrder.save()
    res.status(200).json(newOrder)
})