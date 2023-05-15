import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    questions: [],
    isLoading: false,
    error: null
}

export const fetchQuestions = createAsyncThunk(
    'questions/fetchQuestions',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('/questions')
            return data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const createQuestion = createAsyncThunk(
    'questions/createQuestion', 
    async ({ title, body }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/questions', { title, body })
            return data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
})

const questionSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestions.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.questions = action.payload.questions
                state.isLoading = false
            })
            .addCase(fetchQuestions.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload.message
            })
            .addCase(createQuestion.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(createQuestion.fulfilled, (state, action) => {
                state.questions.push(action.payload)
                state.isLoading = false
            })
            .addCase(createQuestion.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload.message
            })
    }
})

export default questionSlice.reducer