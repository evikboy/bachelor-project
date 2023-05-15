import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchAnswers, createAnswer } from '../../redux/slices/answer/answerSlice'
import { checkIsAuth } from '../../redux/slices/auth/authSlice'
import { Post } from '../../components/Post'
import axios from '../../utils/axios'

import { BiMessage } from 'react-icons/bi'

import styles from './QuestionPage.module.scss'

export const QuestionPage = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(checkIsAuth)
    const { questionId } = useParams()
    const [question, setQuestion] = useState()
    const { answers } = useSelector((state) => state.answer)
    const [commentsMap, setCommentsMap] = useState({})

    const [answerInput, setAnswerInput] = useState('')

    const fetchQuestion = useCallback(async () => {
        const { data } = await axios.get(`/questions/${questionId}`)
        setQuestion(data)
    }, [questionId])

    useEffect(() => {
        fetchQuestion()
    }, [fetchQuestion])

    useEffect(() => {
        dispatch(fetchAnswers(questionId))
    }, [dispatch, questionId])

    const cancelAnswer = () => {
        setAnswerInput('')
    }

    const submitAnswer = () => {
        dispatch(createAnswer({ questionId, body: answerInput }))
        setAnswerInput('')
    }

    if (!question) {
        return (
            <div className='text-center'>
                Завантаження...
            </div>
        )
    }

    return (
        <div className={`${styles.root}`}>

            <Post 
                isQuestion={true}
                id={question._id}
                title={question.title}
                body={question.body}
                user={question.user}
                createdAt={question.createdAt}
                views={question.views}
            />

            <h3 style={{ letterSpacing: '0.05em', marginBottom: '20px' }} className={`text-center`}>Відповіді</h3>

            {isAuth && (
                    <div className={`${styles.reply}`}>
                        <input 
                            className='textCtrl w-100'
                            value={answerInput}
                            onChange={(e) => setAnswerInput(e.target.value)}
                            placeholder='Введіть тут свою мудру пропозицію'  
                        />
                        <div className={`${styles.send_message} d-flex gap-3 justify-content-end`}>
                            <button 
                                className={`btn-default ${styles['btn-cancel']}`}
                                onClick={cancelAnswer}
                            >
                                    Відмінити
                            </button>
        
                            <button 
                                className='btn-default d-flex align-items-center gap-2'
                                onClick={submitAnswer}>
                                    <BiMessage size={15}/>Відправити
                            </button>
                        </div>
                    </div>
            )}


            {answers?.map((answer, idx) => (
                <>
                    <Post 
                        isAnswer={true}
                        id={answer._id}
                        body={answer.body}
                        user={answer.user}
                        createdAt={answer.createdAt}
                        commentsCount={answer.comments.length}
                        key={idx} 
                        commentsMap={commentsMap[answer._id]} 
                        setCommentsMap={setCommentsMap} 
                    />
                    {commentsMap[answer._id]?.open && (
                        commentsMap[answer._id].data.payload?.map((comment, idx) => {
                            return <Post 
                                isComment={true}
                                id={comment._id}
                                body={comment.body}
                                user={comment.user}
                                answerUserName={answer.user.username}
                                key={idx} 
                            />
                        })
                    )}
                </>
            ))
            }
        </div>
    )
}