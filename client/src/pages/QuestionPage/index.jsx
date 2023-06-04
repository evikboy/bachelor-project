import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchAnswers, createAnswer } from '../../redux/slices/answer/answerSlice'
import { checkIsAuth } from '../../redux/slices/auth/authSlice'
import { TextEditor } from '../../components/TextEditor'
import { Post } from '../../components/Post'
import axios from '../../utils/axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { BiMessage } from 'react-icons/bi'
import styles from './QuestionPage.module.scss'
import { CommentInput } from '../../components/CommentInput'

export const QuestionPage = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(checkIsAuth)
    const { questionId } = useParams()
    const [question, setQuestion] = useState()
    const { answers } = useSelector((state) => state.answer)

    const [replyVisibleMap, setReplyVisibleMap] = useState({})
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

    useEffect(() => {
        scrollToAnswer()
    }, [answers])

    const scrollToAnswer = () => {
        const answerId = window.location.hash.substr(1)
        const targetAnswer = document.getElementById(answerId)

        if (targetAnswer) {
            targetAnswer.scrollIntoView({ behavior: 'smooth' })

            targetAnswer.classList.add('post_highlighted')
            console.log(targetAnswer)

            setTimeout(() => {
                targetAnswer.classList.remove('post_highlighted')
            }, 1000)
        }

    }

    const handleAnswer = (value) => {
        setAnswerInput(value)
    }

    const cancelAnswer = () => {
        setAnswerInput('')
    }

    const submitAnswer = () => {
        dispatch(createAnswer({ questionId, body: answerInput }))
        setAnswerInput('')
    }

    const renderComments = (answerId, comments) => {
        return comments.map((comment, idx) => (
            <React.Fragment key={idx}>
                <Post 
                    isComment={true}
                    id={comment._id}
                    body={comment.body}
                    user={comment.user}
                    createdAt={comment.createdAt}
                    setReplyVisibleMap={setReplyVisibleMap}
                    showToast={showToast}
                />
                {replyVisibleMap[comment._id] && (
                    <CommentInput
                        answerId={answerId} 
                        parentId={comment._id} 
                        parentType={'comment'}
                        commentsMap={commentsMap}
                        setCommentsMap={setCommentsMap} 
                        setReplyVisibleMap={setReplyVisibleMap}
                    />   
                )}
            </React.Fragment>
        ))
    }

    if (!question) {
        return (
            <div className='text-center'>
                Завантаження...
            </div>
        )
    }

    const showToast = (toastText, type) => {
        if (type === 'error')
            toast.error(toastText)
        else if (type === 'info')
            toast.info(toastText)
    }

    return (
        <div className={`${styles.root} d-flex`}>
            <div className={`${styles.column}`}>
                <Post 
                    isQuestion={true}
                    id={question.id}
                    title={question.title}
                    body={question.body}
                    user={question.user}
                    createdAt={question.createdAt}
                    views={question.views}
                    tags={question.tags}
                    upvotes={question.upvotes}
                    downvotes={question.downvotes}
                    voteType={question.votes[0]?.voteType || 'Novote'}
                    showToast={showToast}
                />

                <h4 style={{ letterSpacing: '0.05em', marginBottom: '20px' }} className={`text-center`}>Відповіді</h4>

                {isAuth && (
                    <div className={`${styles.reply} d-flex flex-column gap-4`}>
                        <TextEditor
                            value={answerInput}
                            onChange={handleAnswer}
                            maxHeightEditor={450}
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
                    <React.Fragment key={idx}>
                        <Post
                            isAnswer={true}
                            id={answer._id}
                            body={answer.body}
                            user={answer.user}
                            createdAt={answer.createdAt}
                            upvotes={answer.upvotes}
                            downvotes={answer.downvotes}
                            voteType={answer.votes[0]?.voteType || 'Novote'}
                            commentsCount={answer.commentsCount} 
                            commentsMap={commentsMap[answer._id]} 
                            setCommentsMap={setCommentsMap}
                            setReplyVisibleMap={setReplyVisibleMap}
                            showToast={showToast}
                        />
                        {replyVisibleMap[answer._id] && (
                            <CommentInput
                                answerId={answer._id}  
                                parentId={answer._id} 
                                parentType={'answer'} 
                                commentsMap={commentsMap}
                                setCommentsMap={setCommentsMap} 
                                setReplyVisibleMap={setReplyVisibleMap}
                            /> 
                        )}

                        {commentsMap[answer._id]?.open && renderComments(answer._id, commentsMap[answer._id]?.data?.payload)}

                        {!commentsMap[answer._id]?.open && commentsMap[answer._id]?.data?.payload?.length > 0 && 
                            (renderComments(answer._id, commentsMap[answer._id]?.data?.payload.filter(comment => comment.canBeShown === true)))
                        }
                    </React.Fragment>
                ))}

            </div>
            <ToastContainer d toastStyle={{ background: 'rgb(39, 39, 39)', color: 'rgb(214, 214, 214)'}} position={'bottom-right'} />

        </div>
    )
}