import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import cartService from '../services/cartService'

const initialState = {
    cartItems: [],
    loading: false,
    success: false,
    error: false,
    message: ''
}

//add item in cart
export const addItem = createAsyncThunk(
    'cartList/add',
    async (itemData, thunkAPI) => {
        try {
            const userId = thunkAPI.getState().auth.user?._id
            return await cartService.addInCart(`/cart/${userId}`, itemData)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//all products in cart
export const cartProducts = createAsyncThunk(
    'cartList/all',
    async (_, thunkAPI) => {
        const userId = thunkAPI.getState().auth.user?._id
        return await cartService.allItems(`/cart/${userId}`)
    }
)

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        resetState: (state) => {
            state.loading = false
            state.success = false
            state.error = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addItem.fulfilled, (state, action) => {
                state.cartItems = [...state.cartItems, action.payload]
                state.success = true
                state.message = 'Successfully added in cart'
            })
            .addCase(addItem.rejected, (state, action) => {
                state.error = true
                state.message = action.payload
            })
            .addCase(cartProducts.pending, (state) => {
                state.loading = true
            })
            .addCase(cartProducts.fulfilled, (state, action) => {
                state.loading = false
                state.cartItems = action.payload
            })
    }
})

export const { resetState } = cartSlice.actions
export default cartSlice.reducer