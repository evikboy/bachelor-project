import { configureStore} from '@reduxjs/toolkit'
import authSlice from './slices/auth/authSlice'
import questionSlice from './slices/question/questionSlice'
import answerSlice from './slices/answer/answerSlice'
import commentSlice from './slices/comment/commentSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        question: questionSlice,
        answer: answerSlice,
        comment: commentSlice
    }
})