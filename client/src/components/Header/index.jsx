import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap'
import { checkIsAuth, logout } from '../../redux/slices/auth/authSlice'

import { AiOutlinePlusCircle } from 'react-icons/ai'
import { FaSearch } from 'react-icons/fa'

import styles from './Header.module.scss'

export const Header = () => {
    const isAuth = useSelector(checkIsAuth)
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
    }

    return (
        <header className={`${styles.root} fixed-top text-light d-flex align-items-center justify-content-between`}>
            <Link 
                to={'/'} 
                className={`${styles.logo} d-flex align-items-center gap-2`}>
                    <img src='/logo.svg' alt='logo'></img>
                    <div className='mt-2'>trim<span>help</span></div>
            </Link>
    
            <nav className='d-flex align-items-center gap-4'>
                <form className='d-flex'>
                    <span className='d-flex align-items-center'><FaSearch size={15} color='rgb(34, 142, 93)'/></span>
                    <input type='text' className={`textCtrl ${styles.quickSearchField}`} placeholder='Пошук...'></input>
                </form>

                {isAuth ? (
                    <>
                        <Link 
                            to={'/ask'}>
                                <button 
                                    className='btn-default d-flex align-items-center gap-2'>
                                        <AiOutlinePlusCircle/>Запитати
                                </button>
                        </Link>

                        <Dropdown 
                            align='end' 
                            className={`${styles['dropdown-container']}`}>
                                <Dropdown.Toggle 
                                    className={`${styles['avatar-toggle']} d-flex align-items-center gap-2`}>
                                        <img src='/images/ds.jpg' className={`${styles.avatar} rounded-circle`} alt='avatar' />
                                </Dropdown.Toggle>

                                <Dropdown.Menu 
                                    className={`${styles['avatar-dropdown-menu']}`}>
                                        <Dropdown.Item>
                                            Мій профіль
                                        </Dropdown.Item>

                                        <hr />

                                        <Dropdown.Item>
                                            Мої питання
                                        </Dropdown.Item>

                                        <Dropdown.Item>
                                            Мої відповіді
                                        </Dropdown.Item>

                                        <Dropdown.Item>
                                            Мої голоси
                                        </Dropdown.Item>

                                        <hr />

                                        <Dropdown.Item 
                                            onClick={logoutHandler}>
                                                Вийти
                                        </Dropdown.Item>
                                </Dropdown.Menu>
                        </Dropdown>
                    </>
                ) :
                    <>
                        <Link 
                            to='/login'>
                                <button 
                                    className='btn-default'>
                                        Увійти
                                </button>
                        </Link>

                        <Link 
                            to={'/register'}>
                                <button 
                                    className={`btn-default ${styles['btn-reg']} `}>
                                        Зареєструватись
                                </button>
                        </Link>
                    </>
                }
            </nav>
        </header>
    )
}