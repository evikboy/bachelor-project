import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    tags: [],
    isLoading: false,
    error: null
}

export const fetchTags = createAsyncThunk(
    'tags/fetchTags',
    async ({ questionId }, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`questions/${questionId}/tags`)
            return data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

const tagSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTags.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchTags.fulfilled, (state, action) => {
                state.tags = action.payload
                state.isLoading = false
            })
            .addCase(fetchTags.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload.message
            })
    }
})

export default tagSlice.reducer