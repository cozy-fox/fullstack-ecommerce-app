import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import wishReducer from './slices/wishSlice'
import productReducer from './slices/productSlice'
import categoryReducer from './slices/categorySlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        wishList: wishReducer,
        products: productReducer,
        categories: categoryReducer
    }
})

export default store