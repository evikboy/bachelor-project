import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    tags: [],
    isLoading: false,
    error: null
}

const tagSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {},
    extraReducers: {}
})

export default tagSlice.reducer