import React from "react"
import { Link } from "react-router-dom"
import { Dropdown } from "react-bootstrap"

import styles from './Header.module.scss'
import { useDispatch, useSelector } from "react-redux"
import { checkIsAuth, logout } from "../../redux/slices/auth/authSlice"

export const Header = () => {
    const isAuth = useSelector(checkIsAuth)
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
    }

    return (
        <header className={`${styles.root} fixed-top text-light d-flex align-items-center justify-content-between`}>
            <Link to={'/'} className={`${styles.logo} d-flex align-items-center gap-2`}>
                <img src="/logo.svg" alt="logo"></img>
                <div className="mt-3">trim<span>help</span></div>
            </Link>

            <nav className="d-flex align-items-center gap-4">
                <form className="d-flex">
                    <span class="searchIcon icon-magnifying-glass d-flex align-items-center"></span>
                    <input type="text" className={`textCtrl ${styles.quickSearchField}`} placeholder="Пошук..."></input>
                </form>

                {isAuth ? (
                    <>
                        <button className="btn-default icon-square-plus d-flex align-items-center gap-2">Запитати</button>

                        <Dropdown align="end" className={`${styles["dropdown-container"]}`}>
                            <Dropdown.Toggle className={`${styles["avatar-toggle"]} d-flex align-items-center gap-2`}>
                                <img src="/images/ds.jpg" className={`${styles.avatar} rounded-circle`} alt="avatar" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu className={`${styles["avatar-dropdown-menu"]}`}>
                                <Dropdown.Item href="#/action-1">Мій профіль</Dropdown.Item>
                                <hr />
                                <Dropdown.Item href="#/action-2">Мої питання</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Мої відповіді</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Мої голоси</Dropdown.Item>
                                <hr />
                                <Dropdown.Item onClick={logoutHandler}>Вийти</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </>
                ) :
                    <>
                        <Link to="/login">
                            <button className="btn-default">Увійти</button>
                        </Link>

                        <Link to={'/register'}>
                            <button className={`btn-default ${styles["btn-reg"]} `}>Зареєструватись</button>
                        </Link>
                    </>
                }



            </nav>

        </header>
    )
}