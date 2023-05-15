import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../utils/axios'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import styles from './AddQuestionPage.module.scss'


const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
    ],
}
const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color',
]

export const AddQuestionPage = () => {
    const navigate = useNavigate()  
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')


    const submitQuestion = async () => {
        const { data } = await axios.post('/questions', { title, body })
        const { id } = data
        navigate(`/questions/${id}`)
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

                <ReactQuill
                    className='editor-text'
                    theme='snow'
                    modules={modules}
                    formats={formats}
                    value={body}
                    onChange={(value) => setBody(value)}
                />

                <div className="tags__block">
                    <div className="label">
                        <h3>Теги:</h3>
                        <label style={{marginTop: '10px', color: 'rgb(148, 148, 148)'}}>Декілька тегів можуть бути розділені комами</label>
                    </div>

                    <input style={{marginTop: '10px'}} className='textCtrl w-100'></input>
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