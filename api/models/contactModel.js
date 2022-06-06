import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    message: {
        type: Number,
        required: true
    }
})

export default mongoose.model('Message', contactSchema)