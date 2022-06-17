import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import services from '../services'

const initialState = {
    products: [],
    product_loading: false,
    product_success: false,
    product_error: false,
    product_message: ''
}

//all products
export const allProducts = createAsyncThunk(
    'productSlice/all',
    async (_, thunkAPI) => {
        try {
            return await services.allProducts('/product')
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        productReset: (state) => {
            state.product_loading = false
            state.product_error = false
            state.product_success = false
            state.product_message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(allProducts.pending, (state) => {
                state.product_loading = false
            })
            .addCase(allProducts.fulfilled, (state, action) => {
                state.product_loading = false
                state.products = action.payload
            })
            .addCase(allProducts.rejected, (state, action) => {
                state.product_loading = false
                state.product_message = action.payload
            })
    }
})

export const { productReset } = productSlice.actions
export default productSlice.reducer