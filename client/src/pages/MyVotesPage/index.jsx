import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TablePost } from '../../components/TablePost'
import { fetchUserVotes } from '../../redux/slices/vote/voteSlice'

import styles from './MyVotesPage.module.scss'

export const MyVotesPage = () => {
    const dispatch = useDispatch()
    const { votes } = useSelector((state) => state.vote)
    console.log(votes)

    useEffect(() => {
        dispatch(fetchUserVotes())
    }, [dispatch])

    return (
        <div className={`${styles.root} d-flex`}>
            <div className={`${styles.column}`}>
                {votes?.map((vote, idx) => (
                    <TablePost
                        id={vote.targetType === 'Answer' ? `${vote.target?.questionId}#${vote.target?._id}` : vote.target?.questionId}
                        title={vote.target?.questionTitle}
                        createdAt={vote.createdAt}
                        tags={vote.target?.tags}
                        targetType={vote.targetType}
                        voteType={vote.voteType}
                    />
                ))}
            </div>
        </div>
    )
}