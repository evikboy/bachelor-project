import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth } from '../../redux/slices/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { fetchQuestions } from '../../redux/slices/question/questionSlice'
import { Post } from '../../components/Post'

import styles from './MainPage.module.scss'

export const MainPage = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(checkIsAuth)
    const navigate = useNavigate() 
    const { questions } = useSelector((state) => state.question)

    useEffect(() => {
        dispatch(fetchQuestions())
    }, [dispatch])

    const handleInputClick = () => {
        navigate('/ask')
    }

    return (
        <div className={styles.root}>
            
            {isAuth && (
                <div className={`${styles[`reply-block`]} d-flex align-items-center gap-3`}>
                    <Link>
                        <img src='/images/ds.jpg' className={`${styles.avatar} rounded-circle`} alt='avatar'/>
                    </Link>
                    <input 
                        className='textCtrl w-100'
                        placeholder='Створіть питання'
                        onClick={handleInputClick}
                    />
                </div>
            )}

            {questions?.map((obj, idx) => (            
                <Post 
                    isQuestionListItem={true}
                    id={obj.id}
                    title={obj.title}
                    body={obj.body}
                    user={obj.user}
                    createdAt={obj.createdAt}
                    views={obj.views}
                    tags={obj.tags}
                    upvotes={obj.upvotes}
                    downvotes={obj.downvotes}
                    answersCount={obj.answers.length}
                    key={idx} 
                />
            ))}
        </div>
    )
}