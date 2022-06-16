import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import services from '../services'

const initialState = {
    allMessages: [],
    message_loading: false,
    message_success: false,
    message_error: false,
    message: ''
}

//all messages
export const usersMessages = createAsyncThunk(
    'messageSlice/all',
    async (_, thunkAPI) => {
        try {
            return await services.getMessages('/message')
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        messageReset: (state) => {
            state.message_loading = false
            state.message_success = false
            state.message_error = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(usersMessages.pending, (state) => {
                state.message_loading = true
            })
            .addCase(usersMessages.fulfilled, (state, action) => {
                state.allMessages = action.payload
                state.message_loading = false
            })
            .addCase(usersMessages.rejected, (state, action) => {
                state.message = action.payload
                state.message_loading = false
            })
    }
})

export const { messageReset } = messageSlice.actions
export default messageSlice.reducer