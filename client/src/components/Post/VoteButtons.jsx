import React from 'react'

import { BiUpvote } from 'react-icons/bi'
import { BiDownvote } from 'react-icons/bi'

import styles from './Post.module.scss'

export const VoteButtons = ({isQuestion}) => {
    return (
        <div className='d-flex gap-1'>
            <button 
                className={`${styles['btn-vote']} ${styles.up} btn-default d-flex align-items-center gap-2`}>
                    <BiUpvote size={17} color='#009cff' />
                    <span className='position-relative'>
                        {isQuestion && ('Голос ·')} 1.6K
                    </span>
            </button>
            
            <button 
                className={`${styles['btn-vote']} ${styles.down} btn-default d-flex align-items-center`}>
                    <BiDownvote size={17} />
            </button>
        </div>
    )
}



