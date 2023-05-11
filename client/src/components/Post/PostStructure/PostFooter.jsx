import React, {useContext} from "react"
import { Link } from "react-router-dom"
import { TagList } from "../TagList"
import { ActivityItems } from "../ActivityItems"
import { VoteButtons } from "../VoteButtons"
import { AnswerButtons } from "../AnswerButtons"
import { CommentButtons } from "../CommentButtons"
import { PostContext } from '../PostContext'

export const PostFooter = () => {
    const { isQuestionListItem, isQuestion, isAnswer, isComment } = useContext(PostContext)
    
    return (
        <div className="d-flex justify-content-between align-items-center">
            {isQuestionListItem && (
                <>
                    <TagList />
                    <ActivityItems />
                </>
            )}

            {isQuestion && (
                <>
                    <TagList />
                    <VoteButtons />
                </>
            )}

            {isAnswer && (
                <>
                    <VoteButtons />
                    <AnswerButtons />
                </>
            )}

            {isComment && (
                <>
                    <div>Написав <Link>@Yaroslav</Link></div>
                    <CommentButtons />
                </>
            )}
        </div>
    )
}
