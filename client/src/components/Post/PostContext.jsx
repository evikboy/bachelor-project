import React from 'react'

export const PostContext = React.createContext({
    isQuestionListItem: false,
    isQuestion: false,
    isAnswer: false,
    isComment: false
})