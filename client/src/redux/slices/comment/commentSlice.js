import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    comments: [],
    isLoading: false,
    error: null
}

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async ({ answerId }, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`answers/${answerId}/comments`)
            return data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const createComment = createAsyncThunk(
    'comments/createComment', 
    async ({ parentId, parentType, body }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`/${parentType}s/${parentId}/comments`, { body })
            return data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.comments = action.payload
                state.isLoading = false
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload.message
            })
    }
})

export default commentSlice.reducer