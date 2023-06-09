import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchComments } from '../../redux/slices/comment/commentSlice'
import { checkIsAuth } from '../../redux/slices/auth/authSlice'
import { BiChevronsUp } from 'react-icons/bi'
import { BsArrowReturnRight } from 'react-icons/bs'

import styles from './Post.module.scss'

export const AnswerButtons = ({ id, commentsCount , commentsMap, setCommentsMap, setReplyVisibleMap, showToast } ) => {
    const dispatch = useDispatch()
    const isAuth = useSelector(checkIsAuth)
    const [fetchCompleted, setFetchCompleted] = useState(false)
    const reputation = useSelector((state) => state.auth.user?.reputation)

    const handleViewComments = async (data) => {
        if (!fetchCompleted) {
            data = await dispatch(fetchComments({ answerId: id }))
            setFetchCompleted(true)
        } else {
            data = commentsMap?.data
        }
 
        setCommentsMap(prevCommentsMap => ({
            ...prevCommentsMap,
            [id]: {
                open: !commentsMap?.open,
                data: data
            }
        })) 
    }

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
        <div className='d-flex gap-4'>
            {commentsCount > 0 && (
                <button 
                    className={`${styles['btn-simple']} d-flex align-items-center `}
                    onClick={handleViewComments}>
                        <BiChevronsUp size={18}/>
                        {commentsMap?.open ? `Сховати всі коментарі (${commentsCount})` : `Показати всі коментарі (${commentsCount})`}
                </button>
            )}

            {isAuth && (
                <button
                    onClick={handleTogleReply} 
                    className={`${styles['btn-simple']} d-flex align-items-center gap-2`}>
                        <BsArrowReturnRight/>Відповісти
                </button>
            
            )}

        </div>
    )
}


