import React from 'react'
import { UserInfo } from '../UserInfo'
import { Link } from 'react-router-dom'
import { TagList } from './TagList'
import { ActivityItems } from './ActivityItems'
import { VoteButtons } from './VoteButtons'
import { AnswerButtons } from './AnswerButtons'
import { CommentButtons } from './CommentButtons'
import dateFormatter from '../../utils/dateFormatter'

import { IoEllipsisVerticalSharp } from 'react-icons/io5'
import 'react-quill/dist/quill.snow.css'

import styles from './Post.module.scss'
import TextEditor from '../TextEditor'

export const Post = ({ 
    isQuestionListItem, isQuestion, isAnswer, isComment,
    id,
    title,
    body,
    user,
    createdAt,
    views,
    tags,
    upvotes,
    downvotes,
    voteType,
    answersCount,
    commentsCount,
    commentsMap, setCommentsMap,
    setReplyVisibleMap,
    showToast
}) => {
    return (
        <div className={`${styles.root} ${isAnswer ? styles.answer : ''} ${isComment ? styles.comment : ''} d-flex flex-column mw-100`} id={id}>
            
            {(isQuestionListItem || isQuestion || isAnswer) && (
                <div className='post__head d-flex align-items-center'>
                    <UserInfo {...user} additionalText={createdAt} />
                    <span className={`${styles.vertical} `}><IoEllipsisVerticalSharp size={20}/></span>
                </div>
            )}
            

            <div className='post__body'>
                {(isQuestionListItem || isQuestion) && ( 
                    <h5 style={isQuestion ? {  marginBottom : '20px' } : null }><Link to={`questions/${id}`}>{title}</Link></h5> 
                )}
                    {isComment && (
                        <>
                            {body}
                        </>
                    )}

                {(isQuestion || isAnswer) && (
                    <TextEditor 
                        value={body}
                        theme='bubble'
                        readOnly={true}
                    />
                )}

                {(isAnswer || isComment) && ( <> <hr style={{ marginTop : '15px' }}></hr> </> )}
            </div>


            <div className='post__footer d-flex justify-content-between align-items-center'>
                {isQuestionListItem && ( <> <TagList tags={tags} /> <ActivityItems views={views} answersCount={answersCount} votesDif={upvotes - downvotes}/> </> )}
                {isQuestion && ( <> <TagList tags={tags} /> <VoteButtons isQuestion voteType={voteType} targetId={id} targetType={'Question'} votesDif={upvotes - downvotes} showToast={showToast} /> </> )}
                {isAnswer && ( <> <VoteButtons voteType={voteType} targetId={id} targetType={'Answer'} votesDif={upvotes - downvotes} showToast={showToast}/> <AnswerButtons id={id} commentsCount={commentsCount} commentsMap={commentsMap} setCommentsMap={setCommentsMap} setReplyVisibleMap={setReplyVisibleMap} showToast={showToast}/> </> )}
                {isComment && ( <> <div>від <Link style={{ color: '#009cff' }} >{user.username}</Link> <span style={{ color: 'rgb(148, 148, 148)'}}>{dateFormatter(createdAt).toLocaleLowerCase()}</span></div> <CommentButtons id={id} setReplyVisibleMap={setReplyVisibleMap} showToast={showToast}/> </> )}
            </div>
        </div>
    )
}