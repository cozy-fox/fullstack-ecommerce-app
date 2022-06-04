import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import wishReducer from './slices/wishSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        wishList: wishReducer
    }
})

export default store