import React from "react"
import { NavLink } from "react-router-dom"

import styles from './Sidebar.module.scss'

const activeStyles = {
    "border-right": '3px solid rgb(34, 142, 93)',
    "background-color": 'rgba(34, 142, 93, 0.4)'
}

export const Sidebar = () => {
    const isAuth = true

    return (
        <div className={`${styles.root} position-fixed fixed-left h-100`}>
            <nav className={`d-flex flex-column`}>
                <NavLink to={'/'} style={({isActive}) => isActive? activeStyles : undefined} className="icon-house d-flex align-items-baseline">Домашня</NavLink>
                <div>ПУБЛІЧНІ</div>
                <NavLink to={'/questions'} style={({isActive}) => isActive? activeStyles : undefined} className="icon-list d-flex align-items-baseline">Питання</NavLink>
                <NavLink to={'/tags'} style={({isActive}) => isActive? activeStyles : undefined} className="icon-tags d-flex align-items-baseline">Теги</NavLink>
                <NavLink to={'/ranks'} style={({isActive}) => isActive? activeStyles : undefined} className="icon-award-simple d-flex align-items-baseline">Рейтинг</NavLink>

                {isAuth ? (
                    <>
                        <div>ПЕРСОНАЛЬНИЙ НАВІГАТОР</div>
                        <NavLink to={'/my-questions'} style={({isActive}) => isActive? activeStyles : undefined} className="icon-circle-question d-flex align-items-baseline">Ваші питання</NavLink>
                        <NavLink to={'/my-answers'} style={({isActive}) => isActive? activeStyles : undefined} className="icon-comment d-flex align-items-baseline">Ваші відповіді</NavLink>
                        <NavLink to={'/my-votes'} style={({isActive}) => isActive? activeStyles : undefined} className="icon-heart d-flex align-items-baseline">Ваші голоси</NavLink>
                    </>

                ) :
                    <>

                    </>
                }

            </nav>
        </div>
    )
}