import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsFillCaretUpFill } from 'react-icons/bs'
import { BsFillCaretDownFill } from 'react-icons/bs'
import { Dropdown } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'
import { useNavigate, useLocation } from 'react-router-dom'
import { fetchReputationEventsForPeriod } from '../../redux/slices/reputationEvent/reputationEventSlice'

import styles from './RankPage.module.scss'

export const RankPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { reputationEvents } = useSelector((state) => state.reputationEvent)

    const searchParams = new URLSearchParams(location.search)
    const filterFromURL = searchParams.get('filter')
    const [filter, setFilter] = useState(filterFromURL || 'week')

    const [searchText, setSearchText] = useState('')
   
    useEffect(() => {
        const today = new Date()
        let startDate, endDate
    
        if (filter === 'week') {
            startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay())
            endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 6)
        } else if (filter === 'month') {
            startDate = new Date(today.getFullYear(), today.getMonth(), 1)
            endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0)
        } else if (filter === 'year') {
            startDate = new Date(today.getFullYear(), 0, 1)
            endDate = new Date(today.getFullYear(), 11, 31)
        } else if (filter === 'all') {
            startDate = null
            endDate = null 
        }

        dispatch(fetchReputationEventsForPeriod({ startDate, endDate }))
    }, [dispatch, filter])

    const topThreeUsers = reputationEvents.slice(0, 3)
    const topOtherUsers = reputationEvents.slice(3)
    const filteredUsers = topOtherUsers.filter((user) =>
        user.user.username.toLowerCase().includes(searchText.toLowerCase())
    )

    const handleFilterChange = (value) => {
        setFilter(value)
        navigate(`/ranks?filter=${value}`)
    }

    let periodText = ''
    let periodSubText = ''
    if (filter === 'week') {
        periodText = 'НАЙКРАЩИЙ ТИЖНЕВИЙ ПРОГРЕС'
        periodSubText = 'останній тиждень'
    } else if (filter === 'month') {
        periodText = 'НАЙКРАЩИЙ МІСЯЧНИЙ ПРОГРЕС'
        periodSubText = 'останній місяць'
    } else if (filter === 'year') {
        periodText = 'НАЙКРАЩИЙ РІЧНИЙ ПРОГРЕС'
        periodSubText = 'останній рік'
    } else if (filter === 'all') {
        periodText = 'НАЙКРАЩИЙ ПРОГРЕС ЗА ВЕСЬ ЧАС'
        periodSubText = 'весь час'
    }

    return (
        <div className={`${styles.root} d-flex flex-column gap-5`}>
            <Dropdown onSelect={handleFilterChange} className='dropdown-container d-flex justify-content-end'>
                <Dropdown.Toggle variant='default' id='filter-dropdown' className='dropdown-toggle d-flex justify-content-between align-items-center'>
                    {filter === 'week' ? 'Тиждень' : filter === 'month' ? 'Місяць' : filter === 'year' ? 'Рік' : 'Всі'}
                </Dropdown.Toggle>

                <Dropdown.Menu className='dropdown-menu'>
                <Dropdown.Item eventKey='week'>
                    Тиждень
                </Dropdown.Item>
                <Dropdown.Item eventKey='month'>
                    Місяць
                </Dropdown.Item>
                <Dropdown.Item eventKey='year'>
                    Рік
                </Dropdown.Item>
                <Dropdown.Item eventKey='all'>
                    Увесь час
                </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <div className={`d-flex gap-5 flex-wrap`}>
                <div className={`${styles.period_block} text-center`}>
                    <p style={{ color: '#fff'}}>{periodText}</p>
                    <p style={{ fontSize: '13px', color: '#fff' }}>Рейтинг користувачів за {periodSubText}. Дізнайтеся, хто був найбільш активним і впливовим за цей період.</p>
                </div>

                {topThreeUsers.map((user, index) => {
                    return (
                        <React.Fragment key={index}>
                            <div className={`${styles.leader_block} d-flex flex-column align-items-center gap-3`}>
                                <div className='d-flex position-relative align-items-end'>
                                    <img src='/images/ds.jpg' className={`${styles.leader_avatar} rounded-circle`} alt='avatar'/>
                                    <span className={`${styles.medal} ${index === 0 ? styles.gold : index === 1 ? styles.silver : styles.bronze}`}>{index + 1}</span>
                                </div>

                                <div className={`${styles.leader_username}`}><h6>{user.user.username}</h6></div>

                                <hr className='w-100'/>

                                <div className={`${styles.leader_subtext} d-flex align-items-center flex-wrap`}>
                                {user.reputationSum >= 0 ? (
                                    <BsFillCaretUpFill color='rgb(34, 142, 93)' size={18} />
                                    ) : (
                                    <BsFillCaretDownFill color='rgb(142, 34, 34)' size={18} />
                                )} 
                                <span style={{fontWeight: '500'}}>&nbsp; {user.reputationSum}&nbsp;</span> до репутації
                                </div>
                            </div>  
                        </React.Fragment>

                    )
                })}

                <div className={styles.table_wrapper}>


                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>
                                <div>
                                    <FaSearch style={{ position: 'relative', left: '15px'}}/>
                                    <input
                                        style={{ paddingLeft: '25px'}}
                                        type='text'
                                        className='textCtrl tableSearch'
                                        placeholder='Пошук користувача...'
                                        onChange={(e) => setSearchText(e.target.value)}
                                    />
                                </div>

                            </th>
                            <th>РЕПУТАЦІЯ</th>
                        </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <tr key={user.id}>
                                            <td className='d-flex align-items-center gap-3'>
                                                {index + 4}-й
                                                <img src='/images/ds.jpg' className={`${styles.leader_avatar} rounded-circle`} style={{ width: '50px', height: '50px' }} alt='avatar'/>
                                                {user.user.username}
                                            </td>

                                            <td>
                                                <div className='d-flex align-items-center'>
                                                    {user.reputationSum >= 0 ? (
                                                        <BsFillCaretUpFill color='rgb(34, 142, 93)' size={18} />
                                                        ) : (
                                                        <BsFillCaretDownFill color='rgb(142, 34, 34)' size={18} />
                                                    )} 
                                                    &nbsp;{user.reputationSum}
                                                </div>

                                            </td>
                                        </tr>
                                    </React.Fragment>
                                )
                            })}
                        </tbody>
                    </table>
                </div>




            </div>

      
        </div>
    )
}