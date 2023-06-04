import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TablePost } from '../../components/TablePost'
import { fetchUserAnswers } from '../../redux/slices/answer/answerSlice'

import styles from './MyAnswersPage.module.scss'

export const MyAnswersPage = () => {
    const dispatch = useDispatch()
    const { answers } = useSelector((state) => state.answer)
    console.log(answers)

    useEffect(() => {
        dispatch(fetchUserAnswers())
    }, [dispatch])

    return (
        <div className={`${styles.root} d-flex`}>
            <div className={`${styles.column}`}>
                {answers?.map((answer, idx) => (
                    <TablePost
                        id={answer.question.id + `#${answer._id}`}
                        title={answer.question.title}
                        votes={answer.upvotes - answer.downvotes}
                        tags={answer.question.tags}
                        createdAt={answer.createdAt}
                    />
                ))}
            </div>
        </div>
    )
}