import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../services/authService'
import Cookies from 'js-cookie'

const cookieValue = Cookies.get('clientData') ? JSON.parse(Cookies.get('clientData')) : null

const initialState = {
    user: cookieValue,
    message: '',
    loading: false,
    success: false,
    error: false
}

//login user
export const login = createAsyncThunk(
    'auth/login',
    async (user, thunkAPI) => {
        try {
            return await authService.loginService(user)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//logout user
export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        return await authService.logoutService()
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetState: (state) => {
            state.message = ''
            state.loading = false
            state.success = false
            state.error = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload
                state.success = true
                state.loading = false
            })
            .addCase(login.rejected, (state, action) => {
                state.message = action.payload
                state.error = true
                state.loading = false
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    }
})

export const { resetState } = authSlice.actions
export default authSlice.reducer
