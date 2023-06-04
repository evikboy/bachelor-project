import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    votes: [],
    isLoading: false,
    error: null
}

export const fetchUserVotesForAnswers = createAsyncThunk(
    'votes/fetchUserVotesForAnswers',
    async (answerIds, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('/answers/users/votes', { answerIds })
            return data
        } catch (err) {
            rejectWithValue(err.response.data)
        }
    
    }
)

export const fetchUserVotes = createAsyncThunk(
    'questions/fetchUserVotes',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('/users/votes')
            return data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }

    }
)

const voteSlice = createSlice({
    name: 'votes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserVotes.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchUserVotes.fulfilled, (state, action) => {
                state.votes = action.payload.votes
                state.isLoading = false
            })
            .addCase(fetchUserVotes.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
    }
})

export default voteSlice.reducer