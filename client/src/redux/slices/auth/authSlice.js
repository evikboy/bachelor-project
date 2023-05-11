import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from '../../../utils/axios'

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    error: null
}

export const registerUser = createAsyncThunk('auth/registerUser', async(params, { rejectWithValue }) => { 
    try {
        const { data } = await axios.post('/user/register', params)
        if (data.token) {
            window.localStorage.setItem('token', data.token)
        }
        return data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})

export const loginUser = createAsyncThunk('auth/loginUser', async(params, { rejectWithValue }) => { 
    try {
        const { data } = await axios.post('/user/login', params)
        if (data.token) {
            window.localStorage.setItem('token', data.token)
        }
        return data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})

export const getMe = createAsyncThunk('auth/getMe', async(params, { rejectWithValue }) => {
    try {
        const { data } = await axios.get('/user/me')
        return data
    } catch(err) {
        return rejectWithValue(err.response.data)
    }
})

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
                state.isLoading = false
                state.user = action.payload.user
                state.token = action.payload.token
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
                state.isLoading = false
                state.user = action.payload.user
                state.token = action.payload.token
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload.message
            })
            .addCase(getMe.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload?.user
                state.token = action.payload?.token
            })
            .addCase(getMe.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload.message
            })
    }
})

export const checkIsAuth = (state) => Boolean(state.auth.token)

export const { clearError } = authSlice.actions
export const { logout } = authSlice.actions
export default authSlice.reducer