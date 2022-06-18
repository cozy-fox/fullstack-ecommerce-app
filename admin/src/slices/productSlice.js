import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import services from '../services'

const initialState = {
    products: [],
    product_loading: false,
    create_product_loading: false,
    selected_product_loading: null,
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

//create a product
export const newProduct = createAsyncThunk(
    'productSlice/new',
    async (productData, thunkAPI) => {
        try {
            return await services.createProduct('/product/create', productData)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//delete a product
export const deleteProduct = createAsyncThunk(
    'productSlice/delete',
    async (productData, thunkAPI) => {
        try {
            return await services.removeProduct(`/product/${productData.productId}`, productData.imageName)
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
            state.product_error = false
            state.product_success = false
            state.product_message = ''
        },
        productLoading: (state, action) => {
            state.selected_product_loading = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(allProducts.pending, (state) => {
                state.product_loading = true
            })
            .addCase(allProducts.fulfilled, (state, action) => {
                state.product_loading = false
                state.products = action.payload
            })
            .addCase(allProducts.rejected, (state, action) => {
                state.product_loading = false
                state.product_message = action.payload
            })
            .addCase(newProduct.pending, (state) => {
                state.create_product_loading = true
            })
            .addCase(newProduct.fulfilled, (state, action) => {
                state.products = [...state.products, action.payload.newProduct]
                state.create_product_loading = false
                state.product_success = true
                state.product_message = action.payload.message
            })
            .addCase(newProduct.rejected, (state, action) => {
                state.create_product_loading = false
                state.product_error = true
                state.product_message = action.payload
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(product => product._id !== action.payload.productId)
                state.selected_product_loading = null
                state.product_success = true
                state.product_message = action.payload.message
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.selected_product_loading = null
                state.product_error = true
                state.product_message = action.payload
            })
    }
})

export const { productReset, productLoading } = productSlice.actions
export default productSlice.reducer