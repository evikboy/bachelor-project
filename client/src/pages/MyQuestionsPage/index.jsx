import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TablePost } from '../../components/TablePost'
import { fetchUserQuestions } from '../../redux/slices/question/questionSlice'

import styles from './MyQuestionsPage.module.scss'


export const MyQuestionsPage = () => {
    const dispatch = useDispatch()
    const { questions } = useSelector((state) => state.question)
    console.log(questions)

    useEffect(() => {
        dispatch(fetchUserQuestions())
    }, [dispatch])

    return (
        <div className={`${styles.root} d-flex`}>
            <div className={`${styles.column}`}>
                {questions?.map((question, idx) => (
                    <TablePost
                        id={question.id} 
                        title={question.title}
                        votes={question.upvotes - question.downvotes}
                        answersCount={question.answers.length}
                        views={question.views}
                        tags={question.tags}
                        createdAt={question.createdAt}
                        user={question.user}
                        className={`${idx === 0 ? styles.firstPost : ''} ${idx === questions.length - 1 ? styles.lastPost : ''}`}
                    />
                ))}

            </div>
        </div>
    )
}