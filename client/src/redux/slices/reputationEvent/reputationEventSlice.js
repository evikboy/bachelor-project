import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    reputationEvents: [],
    isLoading: false,
    error: null
}

export const fetchReputationEventsForPeriod = createAsyncThunk(
    'reputations/fetchReputationEventsForPeriod',
    async ({ startDate, endDate }, { rejectWithValue }) => {
        try {
            
            const { data } = await axios.post('/users/reputations', { startDate, endDate })
            return data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

const reputationEventsSlice = createSlice({
    name: 'reputationEvents',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReputationEventsForPeriod.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchReputationEventsForPeriod.fulfilled, (state, action) => {
                state.isLoading = false
                state.reputationEvents = action.payload
            })
            .addCase(fetchReputationEventsForPeriod.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
    }
})

export default reputationEventsSlice.reducer