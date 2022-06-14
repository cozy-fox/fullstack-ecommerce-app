import { configureStore } from '@reduxjs/toolkit'
import orderReducer from './slices/orderSlice'

const store = configureStore({
    reducer: {
        order: orderReducer
    }
})

export default store