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

const voteSlice = createSlice({
    name: 'votes',
    initialState,
    reducers: {},
    extraReducers: {}
})

export default voteSlice.reducer