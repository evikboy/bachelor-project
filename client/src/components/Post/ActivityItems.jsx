import React from 'react'

import { HiOutlineEye } from 'react-icons/hi'
import { FaRegComment }  from 'react-icons/fa'
import { AiOutlineArrowUp } from 'react-icons/ai'

export const ActivityItems = ({ views, answersCount, votesDif }) => {
    return (
        <ul className='d-flex align-items-center gap-4'>
            <li className='d-flex align-items-center gap-2'>
                <HiOutlineEye/>{views}
            </li>
            <li className='d-flex align-items-center gap-2'>
                <FaRegComment/>{answersCount}
            </li>
            <li className='d-flex align-items-center gap-2'>
                <AiOutlineArrowUp/>{votesDif}
            </li>
        </ul>
    )
}



