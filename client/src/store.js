import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import wishReducer from './slices/wishSlice'
import productReducer from './slices/productSlice'
import categoryReducer from './slices/categorySlice'
import messageReducer from './slices/messageSlice'
import cartReducer from './slices/cartSlice'
import paymentReducer from './slices/paymentSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        wishList: wishReducer,
        products: productReducer,
        categories: categoryReducer,
        message: messageReducer,
        cart: cartReducer,
        pay: paymentReducer
    }
})

export default store