import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import services from '../services'

const initialState = {
    users: [],
    users_loading: false,
    users_success: false,
    users_error: false,
    users_message: ''
}

//get all users
export const allUsers = createAsyncThunk(
    'userSlice/all',
    async () => {
        try {
            return await services.allUsers('/user')
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        usersReset: (state) => {
            state.users_error = false
            state.users_message = ''
            state.users_success = false
            state.users_loading = false
        }
    },
    extraReducers: (builder) => { }
})

export const { usersReset } = userSlice.actions
export default userSlice.reducer