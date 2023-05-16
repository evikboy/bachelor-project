import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    error: null
}

export const registerUser = createAsyncThunk(
    'auth/registerUser', 
    async ({ username, email, password }, { rejectWithValue }) => { 
        try {
            const { data } = await axios.post('/users/register', { username, email, password })
            if (data.token) window.localStorage.setItem('token', data.token)
            return data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/loginUser', 
    async ({ email, password }, { rejectWithValue }) => { 
        try {
            const { data } = await axios.post('/users/login', { email, password })
            if (data.token) window.localStorage.setItem('token', data.token)
            return data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const getMe = createAsyncThunk(
    'auth/getMe', 
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('/users/me')
            return data
        } catch(err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            state.token =  null
            state.isLoading = false
            state.error = null
        },
        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.token = action.payload.token
                state.isLoading = false
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload.message
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.token = action.payload.token
                state.isLoading = false
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.err.message
            })
            .addCase(getMe.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.user = action.payload?.user
                state.token = action.payload?.token
                state.isLoading = false
            })
            .addCase(getMe.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload.message
            })
    }
})

export const checkIsAuth = (state) => Boolean(state.auth.token)

export const { logout } = authSlice.actions
export const { clearError } = authSlice.actions

export default authSlice.reducer