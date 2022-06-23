import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { errorHandler } from './middleware/errorMiddleware.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js'
import categoryRouter from './routes/categoryRoutes.js'
import productRouter from './routes/productRoutes.js'
import wishlistRouter from './routes/wishlistRoutes.js'
import messageRouter from './routes/messageRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import checkoutRouter from './routes/checkoutRoutes.js'
import orderRouter from './routes/orderRoutes.js'
import session from 'express-session'

dotenv.config()
const app = express()
const port = process.env.PORT || 5000

async function connect() {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('connected to mongodb')
    } catch (error) {
        throw error
    }
}

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    credentials: true,
    origin: ["https://client-five-blue.vercel.app"]
}))

app.set("trust proxy", 1);

app.use(
    session({
        secret: process.env.SESSION_SECRET || 'Super Secret (change it)',
        resave: true,
        saveUninitialized: false,
        cookie: {
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax', // must be 'none' to enable cross-site delivery
            secure: process.env.NODE_ENV === "production", // must be true if sameSite='none'
        }
    })
);

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/category', categoryRouter)
app.use('/api/product', productRouter)
app.use('/api/wishlist', wishlistRouter)
app.use('/api/message', messageRouter)
app.use('/api/cart', cartRouter)
app.use('/api/checkout', checkoutRouter)
app.use('/api/order', orderRouter)

app.get('/api/publishableKey', (req, res) => {
    res.status(200).json({ key: process.env.STRIPE_PUBIC })
})

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello from API' })
})

app.use(errorHandler)

app.listen(port, () => {
    connect()
    console.log(`listening to port ${port}`)
})