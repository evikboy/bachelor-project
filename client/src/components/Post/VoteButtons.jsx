import React, { useState } from 'react'
// import { useSelector } from 'react-redux'
// import { checkIsAuth } from '../../redux/slices/auth/authSlice'
import { BiUpvote } from 'react-icons/bi'
import { BiDownvote } from 'react-icons/bi'
import axios from '../../utils/axios'
import styles from './Post.module.scss'

export const VoteButtons = ({ isQuestion, targetId, targetType, voteType, votesDif, showToast }) => {
    const [voted, setVoted] = useState(voteType)
    const [voteCount, setVoteCount] = useState(votesDif)
    

    const handleVote = async (newVoteType) => {
        if (voted === newVoteType) newVoteType = 'Novote'
        
        try {
            await axios.post(`/${targetType.toLowerCase()}s/${targetId}/votes`, { targetId: targetId, targetType: targetType, voteType: newVoteType })
        } catch (err) {
            showToast(err.response.data.message, 'error')
            return
        }

        if (newVoteType === 'Upvote') setVoteCount(voted === 'Downvote' ? voteCount + 2 : voteCount + 1)
        if (newVoteType === 'Downvote') setVoteCount(voted === 'Upvote' ? voteCount - 2 : voteCount - 1)
        else if (newVoteType === 'Novote') setVoteCount(voted === 'Upvote' ? voteCount - 1 : voteCount + 1)

        setVoted(newVoteType)
    }

    return (
        <div className='d-flex gap-1'>
            <button 
                className={`${styles['btn-vote']} ${voted === 'Upvote' ? styles.votedUp : ''} ${styles.up} btn-default d-flex align-items-center gap-2`}
                onClick={() => handleVote('Upvote')}
            >
                    <BiUpvote size={17} />
                    <span className='position-relative'>
                        {isQuestion && ('Голос ')} { voted ? voteCount : votesDif }
                    </span>
            </button>
            
            <button 
                className={`${styles['btn-vote']} ${voted === 'Downvote' ? styles.votedDown : ''} ${styles.down} btn-default d-flex align-items-center`}
                onClick={() => handleVote('Downvote')}
            >
                    <BiDownvote size={17} />
            </button>
        </div>
    )
}



