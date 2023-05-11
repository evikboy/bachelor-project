import React, { useContext } from "react"
import { UserInfo } from "../../UserInfo"
import { PostContext } from '../PostContext'

import styles from '../Post.module.scss'

export const PostHead = () => {
    const { isQuestionListItem, isQuestion, isAnswer } = useContext(PostContext)

    return (
        <div className="post__head d-flex align-items-center">
            {(isQuestionListItem || isQuestion || isAnswer)  && (
                <>
                    <UserInfo />
                    <span className={`${styles.vertical} icon-ellipsis-vertical`}></span>
                </>
            )}
        </div>
    )
}
