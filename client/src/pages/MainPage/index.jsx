import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth } from '../../redux/slices/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { filterQuestions } from '../../redux/slices/question/questionSlice'
import { Post } from '../../components/Post'
import { Dropdown } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

import styles from './MainPage.module.scss'

export const MainPage = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const isAuth = useSelector(checkIsAuth)
    const navigate = useNavigate() 
    const { questions } = useSelector((state) => state.question)

    const searchParams = new URLSearchParams(location.search)
    const filterFromURL = searchParams.get('filter')
    const [filter, setFilter] = useState(filterFromURL || 'dob_question')

    useEffect(() => {
        dispatch(filterQuestions(filter))
    }, [dispatch, filter])

    const handleInputClick = () => {
        navigate('/ask')
    }

    const handleFilterChange = (value) => {
        setFilter(value)
        navigate(`/?filter=${value}`)
    }

    return (
        <div className={`${styles.root} d-flex`}>
            <div className={`${styles.column}`}>
                {isAuth && (
                    <div className={`${styles[`reply-block`]} d-flex align-items-center gap-3`}>
                        <Link>
                            <img src='/images/ds.jpg' className={`${styles.avatar} rounded-circle`} alt='avatar'/>
                        </Link>
                        <input 
                            className='textCtrl w-100'
                            placeholder='Створіть питання'
                            onClick={handleInputClick}
                        />
                    </div>
                )}

                <Dropdown onSelect={handleFilterChange} className='dropdown-container d-flex justify-content-end'>
                    <Dropdown.Toggle style={{marginBottom: '1.5rem', width: '250px'}} variant='default' id='filter-dropdown' className='dropdown-toggle d-flex justify-content-between align-items-center'>
                        {filter === 'dob_question' ? 'По даті стоврення питання' : 
                            filter === 'byLast_answer' ? ' По останній відповіді' : 
                            filter === 'byNumber_views' ? ' За кількістю переглядів' :
                            filter === 'byNumber_answers' ? 'За кількістю відповідей' :
                            filter === 'byNumber_votes' ? 'За кількістю голосів' : ''
                        }
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{width: '250px'}} className='dropdown-menu'>
                    <Dropdown.Item eventKey='dob_question'>
                        По даті стоврення питання
                    </Dropdown.Item>
                    <Dropdown.Item eventKey='byLast_answer'>
                        По останній відповіді
                    </Dropdown.Item>
                    <Dropdown.Item eventKey='byNumber_views'>
                        За кількістю переглядів
                    </Dropdown.Item>
                    <Dropdown.Item eventKey='byNumber_answers'>
                        За кількістю відповідей
                    </Dropdown.Item>
                    <Dropdown.Item eventKey='byNumber_votes'>
                        За кількістю голосів
                    </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                {questions?.map((obj, idx) => (            
                    <Post 
                        isQuestionListItem={true}
                        id={obj._id}
                        title={obj.title}
                        body={obj.body}
                        user={obj.user}
                        createdAt={obj.createdAt}
                        views={obj.views}
                        tags={obj.tags}
                        upvotes={obj.upvotes}
                        downvotes={obj.downvotes}
                        answersCount={obj.answers.length}
                        key={idx} 
                    />
                ))}

            </div>


        </div>
    )
}