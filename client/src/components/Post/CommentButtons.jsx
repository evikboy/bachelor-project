import React from "react"
import { useSelector } from 'react-redux'
import { BsArrowReturnRight } from 'react-icons/bs'

import styles from './Post.module.scss'

export const CommentButtons = ({ id, setReplyVisibleMap, showToast }) => {
    const reputation = useSelector((state) => state.auth.user?.reputation)

    const handleTogleReply = () => {
        if (reputation < 50) {
            showToast('Ви повинні мати 50 репутації, щоб коментувати', 'info')
            return
        }
        
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
