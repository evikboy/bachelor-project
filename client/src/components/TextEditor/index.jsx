import React, { useEffect, useState, useRef } from 'react'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { AiOutlineArrowUp } from 'react-icons/ai'

import './TextEditor.scss'

export const TextEditor = ({ value, onChange, editorHeight = 0 }) => {
    const quill = useRef(null)

    const [toolbarVisible, setToolbarVisible] = useState(false)

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image', 'code-block'],
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
        'code-block',
    ]

    useEffect(() => {
        const qlContainer = document.querySelector('.ql-editor')
        
        if (qlContainer) qlContainer.style.minHeight = `${editorHeight}px`  
    }, [editorHeight])

    useEffect(() => {
        const qlToolbar = document.querySelector('.ql-toolbar')
        const qlContainer = document.querySelector('.ql-container')

        if (editorHeight === 0) {
            if (!toolbarVisible) {
                qlToolbar.classList.add('toolbar-hide')
                qlContainer.classList.add('container-changeBorder') 
            } else {
                qlToolbar.classList.remove('toolbar-hide')
                qlContainer.classList.remove('container-changeBorder')
            }
        }
      }, [toolbarVisible, editorHeight])


    const toggleToolbarVisibility = () => {
        setToolbarVisible(!toolbarVisible)
    }

    return (
        <div className='position-relative'>
            <ReactQuill
                className={`editor-text`}
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                ref={quill}
            />
            {editorHeight === 0 && (
                <AiOutlineArrowUp size={22} display={'block'} style={{cursor: 'pointer', position: 'absolute', marginLeft: 'auto', bottom: '12px', right: '10px'}}
                onClick={toggleToolbarVisibility}  />
            )}
        </div>
    )
}