import React, {useContext} from "react"
import { Link } from "react-router-dom"
import { PostContext } from '../PostContext'

export const PostBody = () => {
    const { isQuestionListItem, isQuestion, isAnswer, isComment } = useContext(PostContext)
    return (
        <div className="post__body">
            {(isQuestionListItem || isQuestion) && (
                <>
                    <h3 style={{ marginBottom : "15px" }}><Link>Hello!</Link></h3>
                </>
            )}

            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum unde totam est corporis a aspernatur nesciunt nam distinctio blanditiis mollitia, voluptatum quod repudiandae ut quis aliquid laboriosam asperiores quos expedita!

            {(isAnswer || isComment) && (
                <>
                    <hr style={{ marginTop : "15px" }}></hr> 
                </>
            )}
        </div>
    )
}
