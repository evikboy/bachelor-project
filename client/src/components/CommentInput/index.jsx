import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import TextareaAutosize from 'react-textarea-autosize'
import { createComment } from '../../redux/slices/comment/commentSlice'
import styles from './CommentInput.module.scss'

export const CommentInput = ({ answerId, parentId, parentType, commentsMap, setCommentsMap, setReplyVisibleMap }) => {
    const dispatch = useDispatch()

    const [commentInput, setCommentInput] = useState({})

    const handleCommentInputChange = (parentId, value) => {
        setCommentInput(prevCommentInputs => ({
            ...prevCommentInputs,
            [parentId]: value
        }))
    }

    const submitComment = async ({ answerId, parentId, parentType }) => {
        let replyUser = null

        if (parentType !== 'answer') replyUser = commentsMap[answerId]?.data.payload.find(comment => comment._id === parentId)?.user

        const replyUsername = replyUser ? `@${replyUser.username} ` : ''

        const response = await dispatch(createComment({ 
            parentId, 
            parentType,
            answerId, 
            body: `${replyUsername}${commentInput[parentId]}`
        }))

        const findOldestParent = (commentId) => {
            const currentComment = commentsMap[answerId]?.data.payload.filter(comment => comment._id === commentId)[0];
            if (!currentComment || !currentComment.parentId || currentComment.parentType === 'answers') {
              return commentId;
            }
            return findOldestParent(currentComment.parentId);
        };
        console.log(findOldestParent(parentId))

        const oldestComm = commentsMap[answerId]?.data.payload.filter(comment => comment._id === findOldestParent(parentId))[0];
        let canBeShown = false;

        if (parentType === 'answer' || (oldestComm && oldestComm.isNewComment)) {
          canBeShown = true;
        }

        console.log(canBeShown)





        setCommentsMap(prevCommentsMap => ({
            ...prevCommentsMap,
            [answerId]: {
                ...prevCommentsMap[answerId],
                data: {
                    ...prevCommentsMap[answerId]?.data,
                    payload: [
                        ...(prevCommentsMap[answerId]?.data.payload || []),
                        {
                            ...response.payload,
                            isNewComment: true,
                            canBeShown: canBeShown
                        }
                    ],
                }
            }
        }))

        setCommentInput(prevCommentInputs => ({
            ...prevCommentInputs,
            [parentId]: ''
        }))

        setReplyVisibleMap((prevReplyVisibleMap) => ({
            ...prevReplyVisibleMap,
            [parentId]: false,
        }))
    }

    return (
        <div className={`${styles.root} d-flex align-items-center gap-3`}>
            <Link className='align-self-start'><img src='/images/ds.jpg' className={`${styles.avatar} rounded-circle`} alt='avatar'/></Link>

            <TextareaAutosize
                className='textCtrl w-100'
                value={commentInput[parentId]}
                onChange={e => handleCommentInputChange(parentId, e.target.value)}
                placeholder='Додайте коментар...'
            />

            <button 
                className='btn-default align-self-end'
                onClick={() => submitComment({ answerId, parentId, parentType })}
            >
                Відповісти
            </button>
        </div>       
    )
}

