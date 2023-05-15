import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { checkIsAuth } from '../../redux/slices/auth/authSlice'

import { AiOutlineHome } from 'react-icons/ai'
import { AiOutlineUnorderedList }  from 'react-icons/ai'
import { AiOutlineTags }  from 'react-icons/ai'
import { FaAward }  from 'react-icons/fa'
import { AiOutlineQuestionCircle }  from 'react-icons/ai'
import { FaRegComment }  from 'react-icons/fa'
import { AiOutlineHeart }  from 'react-icons/ai'

import styles from './Sidebar.module.scss'

const activeStyles = {
    'borderRight': '3px solid rgb(34, 142, 93)',
    'backgroundColor': 'rgba(34, 142, 93, 0.4)'
}

export const Sidebar = () => {
    const isAuth = useSelector(checkIsAuth)

    return (
        <div className={`${styles.root} position-fixed fixed-left h-100`}>
            <nav className={`d-flex flex-column`}>
                <NavLink 
                    to={'/'} 
                    style={({isActive}) => isActive? activeStyles : undefined} 
                    className='d-flex align-items-baseline gap-4'>
                        <AiOutlineHome size={18}/>Домашня
                </NavLink>

                <div>ПУБЛІЧНІ</div>

                <NavLink 
                    to={'/questions'}
                    style={({isActive}) => isActive? activeStyles : undefined}
                    className='d-flex align-items-baseline gap-4'>
                        <AiOutlineUnorderedList size={18}/>Питання
                </NavLink>

                <NavLink 
                    to={'/tags'} 
                    style={({isActive}) => isActive? activeStyles : undefined} 
                    className='d-flex align-items-baseline gap-4'>
                        <AiOutlineTags size={18}/>Теги
                </NavLink>

                <NavLink 
                    to={'/ranks'} 
                    style={({isActive}) => isActive? activeStyles : undefined} 
                    className='d-flex align-items-baseline gap-4'>
                        <FaAward size={18}/>Рейтинг
                </NavLink>

                {isAuth ? (
                    <>
                        <div>ПЕРСОНАЛЬНИЙ НАВІГАТОР</div>

                        <NavLink 
                            to={'/my-questions'} 
                            style={({isActive}) => isActive? activeStyles : undefined} 
                            className='d-flex align-items-baseline gap-4'>
                                <AiOutlineQuestionCircle size={18}/>Ваші питання
                        </NavLink>

                        <NavLink 
                            to={'/my-answers'} 
                            style={({isActive}) => isActive? activeStyles : undefined} 
                            className='d-flex align-items-baseline gap-4'>
                                <FaRegComment size={17}/>Ваші відповіді
                        </NavLink>

                        <NavLink 
                            to={'/my-votes'} style={({isActive}) => isActive? activeStyles : undefined} 
                            className='d-flex align-items-baseline gap-4'>
                                <AiOutlineHeart size={18}/>Ваші голоси
                        </NavLink>
                    </>
                ) : ''
                }
            </nav>
        </div>
    )
}