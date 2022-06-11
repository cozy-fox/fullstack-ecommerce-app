import asyncHandler from 'express-async-handler'
import stripe from 'stripe'
import Cart from '../models/cartModel.js'
import dotenv from 'dotenv'

dotenv.config()

const stripeConfig = stripe(process.env.STRIPE)

export const checkout = asyncHandler(async (req, res) => {
    const cartItems = await Cart.find({ _id: { $in: req.body } })

    const session = await stripeConfig.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: cartItems.map(item => {
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.productName
                    },
                    unit_amount: item.productPrice * 100
                },
                quantity: item.quantity
            }
        }),
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`,
    })

    console.log('hello')

    res.status(200).json({ url: session.url, itemIds: req.body })
})