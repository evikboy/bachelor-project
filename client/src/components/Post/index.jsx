import React from "react"
import { PostContext } from "./PostContext"
import { PostHead } from "./PostStructure/PostHead"
import { PostBody } from "./PostStructure/PostBody"
import { PostFooter } from "./PostStructure/PostFooter"

import styles from './Post.module.scss'

export const Post = ({isQuestionListItem, isQuestion, isAnswer, isComment}) => {
    const value = {
        isQuestionListItem: isQuestionListItem ? true : undefined,
        isQuestion: isQuestion ? true : undefined,
        isAnswer: isAnswer ? true : undefined,
        isComment: isComment ? true : undefined
    }

    return (
        <div className={`${styles.root} ${isAnswer ? styles.answer : ''} ${isComment ? styles.comment : ''} d-flex flex-column mw-100`}>
            <PostContext.Provider value={value}>
                <PostHead />
                <PostBody />
                <PostFooter />
            </PostContext.Provider>
        </div>
    )
}