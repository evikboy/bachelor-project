import React from 'react'
import { UserInfo } from '../UserInfo'
import { Link } from 'react-router-dom'
import { TagList } from './TagList'
import { ActivityItems } from './ActivityItems'
import { VoteButtons } from './VoteButtons'
import { AnswerButtons } from './AnswerButtons'
import { CommentButtons } from './CommentButtons'

import { IoEllipsisVerticalSharp } from 'react-icons/io5'

import styles from './Post.module.scss'

export const Post = ({ 
    isQuestionListItem, isQuestion, isAnswer, isComment,
    id,
    title,
    body,
    user,
    createdAt,
    views,
    answersCount,
    commentsCount,
    answerUserName,
    commentsMap, setCommentsMap }) => {
    return (
        <div className={`${styles.root} ${isAnswer ? styles.answer : ''} ${isComment ? styles.comment : ''} d-flex flex-column mw-100`}>
            <div className='post__head d-flex align-items-center'>
                {(isQuestionListItem || isQuestion || isAnswer) && (
                    <>  
                        <UserInfo {...user} additionalText={createdAt} />
                        <span className={`${styles.vertical} `}><IoEllipsisVerticalSharp size={20}/></span>
                    </>
                )}
            </div>

            <div className='post__body'>
                {(isQuestionListItem || isQuestion) && ( 
                    <h3 style={{ marginBottom : '15px' }}><Link to={`questions/${id}`}>{title}</Link></h3> 
                )}
                {isComment && ( `@${answerUserName}, `) }
                {body}
                {(isAnswer || isComment) && ( <> <hr style={{ marginTop : '15px' }}></hr> </> )}
            </div>


            <div className='post__footer d-flex justify-content-between align-items-center'>
                {isQuestionListItem && ( <> <TagList /> <ActivityItems views={views} answersCount={answersCount}/> </> )}
                {isQuestion && ( <> <TagList /> <VoteButtons isQuestion /> </> )}
                {isAnswer && ( <> <VoteButtons /> <AnswerButtons id={id} commentsCount={commentsCount} commentsMap={commentsMap} setCommentsMap={setCommentsMap} /> </> )}
                {isComment && ( <> <div>від <Link>@{user.username}</Link></div> <CommentButtons /> </> )}
            </div>
        </div>
    )
}