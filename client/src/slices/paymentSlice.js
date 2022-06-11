import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import checkoutService from '../services/checkoutService'

const initialState = {
    items: [],
    url: '',
    checkout_success: false,
    checkout_loading: false,
    checkout_error: false,
    checkout_message: ''
}

//checkout
export const urlForCheckout = createAsyncThunk(
    'checkout/url',
    async (itemData, thunkAPI) => {
        try {
            const userId = thunkAPI.getState().auth.user?._id
            return await checkoutService.checkout(`/checkout/${userId}`, itemData)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const paymentSlice = createSlice({
    name: 'pay',
    initialState,
    reducers: {
        reset: (state) => {
            state.url = ''
            state.checkout_loading = false
            state.checkout_error = false
            state.checkout_success = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(urlForCheckout.pending, (state) => {
                state.checkout_loading = true
            })
            .addCase(urlForCheckout.fulfilled, (state, action) => {
                state.url = action.payload.url
                state.items = action.payload.itemIds
                state.checkout_success = true
                state.checkout_loading = false
            })
            .addCase(urlForCheckout.rejected, (state, action) => {
                state.checkout_error = true
                state.checkout_message = action.payload
                state.checkout_loading = false
            })
    }
})

export const { reset } = paymentSlice.actions
export default paymentSlice.reducer