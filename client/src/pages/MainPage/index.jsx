import React, { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { fetchQuestions } from '../../redux/slices/question/questionSlice'
import { Post } from '../../components/Post'

export const MainPage = () => {
    const dispatch = useDispatch()
    const { questions } = useSelector((state) => state.question)

    useEffect(() => {
        dispatch(fetchQuestions())
    }, [dispatch])

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
                    answersCount={obj.answers.length}
                    key={idx} />
            ))}
        </div>
    )
}