import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Navigate } from 'react-router-dom'
import { checkIsAuth } from '../../redux/slices/auth/authSlice'
import { TextEditor } from '../../components/TextEditor'
import axios from '../../utils/axios'
import styles from './AddQuestionPage.module.scss'

export const AddQuestionPage = () => {
    const navigate = useNavigate()  
    const isAuth = useSelector(checkIsAuth)

    const [title, setTitle] = useState('')
    const [tags, setTags] = useState('')
    const [body, setBody] = useState('')

    const handleBodyChange = (value) => {
        setBody(value)
    }
    
    const submitQuestion = async () => {
        const { data: createdQuestion } = await axios.post('/questions', { title, body })
        const { id } = createdQuestion
        await axios.post(`/questions/${id}/tags`, { name: tags })
        navigate(`/questions/${id}`)
    }

    if (!window.localStorage.getItem('token') && !isAuth) {
        return <Navigate to='/login' />
    }

    return (
        <div className='d-flex flex-column gap-4'>
            <div className={`${styles.root} d-flex flex-column gap-5`}>
                <div className="header__block">
                    <div className="label">
                        <h3>Заголовок:</h3>
                        <label style={{marginTop: '10px', color: 'rgb(148, 148, 148)'}}>Сформулюйте у кількох словах про що ваше питання</label>
                    </div>

                    <input 
                        style={{marginTop: '10px'}} 
                        className='textCtrl w-100'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    >
                    </input>
                </div>


                <TextEditor
                    minHeightEditor={250} 
                    maxHeightEditor={400}
                    value={body}
                    onChange={handleBodyChange}
                />   

                <div className="tags__block">
                    <div className="label">
                        <h3>Теги:</h3>
                        <label style={{marginTop: '10px', color: 'rgb(148, 148, 148)'}}>Декілька тегів можуть бути розділені комами</label>
                    </div>

                    <input style={{marginTop: '10px'}} 
                        className='textCtrl w-100'
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    >
                    </input>
                </div>

                <button 
                    className='d-flex align-items-baseline gap-2 btn-default icon-paper-plane ms-auto'
                    onClick={submitQuestion}
                >
                    Опублікувати
                </button>
            </div>

        </div>

        
    ) 
}