import React from "react"

import { BsArrowReturnRight } from 'react-icons/bs'

import styles from './Post.module.scss'

export const CommentButtons = () => {
    return (
        <div className="d-flex gap-4">
            <button className={`${styles["btn-simple"]} d-flex align-items-center gap-2`}><BsArrowReturnRight />Відповісти</button>
        </div>
    )
}
