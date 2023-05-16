import React, { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { fetchQuestions } from '../../redux/slices/question/questionSlice'
import { fetchTags } from '../../redux/slices/tag/tagSlice'
import { Post } from '../../components/Post'

export const MainPage = () => {
    const dispatch = useDispatch()
    const { questions } = useSelector((state) => state.question)
    const { tags } = useSelector((state) => state.tag)

    useEffect(() => {
        dispatch(fetchQuestions())
    }, [dispatch])

    useEffect(() => {
        questions.forEach((question) => {
            dispatch(fetchTags({ questionId: question.id }))
        })
    }, [dispatch, questions])

    return (
        <div>
            {questions?.map((obj, idx) => (
                <Post 
                    isQuestionListItem={true}
                    id={obj.id}
                    title={obj.title}
                    body={obj.body}
                    user={obj.user}
                    createdAt={obj.createdAt}
                    views={obj.views}
                    tags={tags}
                    answersCount={obj.answers.length}
                    key={idx} 
                />
            ))}
        </div>
    )
}