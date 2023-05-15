import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    answers: [],
    isLoading: false,
    error: null
}

export const fetchAnswers = createAsyncThunk(
    'answers/fetchAnswers',
    async (questionId, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/questions/${questionId}/answers`)
            return data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const createAnswer = createAsyncThunk(
    'answers/createAnswer', 
    async ({ questionId, body }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`/questions/${questionId}/answers`, { body })
            return data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

const answerSlice = createSlice({
    name: 'answers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAnswers.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchAnswers.fulfilled, (state, action) => {
                state.answers = action.payload
                state.isLoading = false
            })
            .addCase(fetchAnswers.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload.message
            })
            .addCase(createAnswer.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(createAnswer.fulfilled, (state, action) => {
                state.answers.push(action.payload)
                state.isLoading = false
            })
            .addCase(createAnswer.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload.message
            })
    }
})

export default answerSlice.reducer