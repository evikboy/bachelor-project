import React from "react"

import { BsArrowReturnRight } from 'react-icons/bs'

import styles from './Post.module.scss'

export const CommentButtons = ({ id, setReplyVisibleMap }) => {

    const handleTogleReply = () => {
        setReplyVisibleMap(prevReplyMap => ({
            ...prevReplyMap,
            [id]: !prevReplyMap[id]
        }))
    }

    return (
        <div className="d-flex gap-4">
            <button 
                className={`${styles["btn-simple"]} d-flex align-items-center gap-2`}
                onClick={handleTogleReply}
            >
                <BsArrowReturnRight />Відповісти
            </button>
        </div>
    )
}
