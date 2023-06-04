import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTags } from '../../redux/slices/tag/tagSlice'
import { TagBlock } from '../../components/TagBlock'

export const TagsPage = () => {
    const dispatch = useDispatch()
    const { tags } = useSelector((state) => state.tag)

    useEffect(() => {
        dispatch(fetchTags())
    }, [dispatch])

    return (
        <div className='d-flex gap-4 flex-wrap'>
            {tags?.map((tag, idx) => (
                <TagBlock 
                    name={tag.name}
                    description={tag.description}
                    questionCount={tag.questionCount}
                    key={idx}
                />
            ))}
        </div>
    )
}