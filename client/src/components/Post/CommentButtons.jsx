import React from "react"

import styles from './Post.module.scss'

export const CommentButtons = ({ children }) => {
    return (
        <div className="d-flex gap-4">
            <button className={`${styles["btn-simple"]} icon-arrow-turn-down-right d-flex align-items-center gap-2`}>Відповісти</button>
        </div>
    )
}
