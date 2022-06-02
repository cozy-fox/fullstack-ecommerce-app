import express from 'express'
import dotenv from 'dotenv'
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js'
import mongoose from 'mongoose'
import { errorHandler } from './middleware/errorMiddleware.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import categoryRouter from './routes/categoryRoutes.js'

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
app.use(cors())

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/category', categoryRouter)

app.use(errorHandler)

app.listen(port, () => {
    connect()
    console.log(`listening to port ${port}`)
})