// import React, { useEffect, useState, useRef } from 'react'
// import ReactQuill from 'react-quill'
// import 'react-quill/dist/quill.snow.css'

// import { FiArrowUp } from 'react-icons/fi'
// import { BsCardImage } from 'react-icons/bs'
// import axios from '../../utils/axios'
// import './TextEditor.scss'

// import hljs from 'highlight.js'
// import 'highlight.js/styles/github.css'

// hljs.configure({
//     languages: ['javascript', 'ruby', 'python', 'rust'],
// })

// export const TextEditor = ({ value, onChange, editorHeight = 0 }) => {
//     const quill = useRef(null)

    
//     const inputFileRef = useRef(null)
//     const [toolbarVisible, setToolbarVisible] = useState(false)

//     const modules = {
//         syntax: {
//             highlight: text => hljs.highlightAuto(text).value,
//         },
//         toolbar: [
//             ['bold', 'italic', 'underline','strike', 'blockquote'],
//             [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
//             ['link', 'image', 'code-block'],
//             ['clean']
//         ],
//         clipboard: {
//             matchVisual: false
//         },

//     }

//     const formats = [
//         'header',
//         'font',
//         'size',
//         'bold',
//         'italic',
//         'underline',
//         'strike',
//         'blockquote',
//         'list',
//         'bullet',
//         'indent',
//         'link',
//         'image',
//         'code-block',
//     ]

//     useEffect(() => {
//         const qlContainer = document.querySelector('.ql-editor')
        
//         if (qlContainer) qlContainer.style.minHeight = `${editorHeight}px`  
//     }, [editorHeight])

//     useEffect(() => {
//         const qlToolbar = document.querySelector('.ql-toolbar')
//         const qlContainer = document.querySelector('.ql-container')

//         if (qlToolbar && qlContainer) {
//             if (editorHeight === 0) {
//                 if (!toolbarVisible) {
//                     qlToolbar.classList.add('toolbar-hide')
//                     qlContainer.classList.add('container-changeBorder') 
//                 } else {
//                     qlToolbar.classList.remove('toolbar-hide')
//                     qlContainer.classList.remove('container-changeBorder')
//                 }
//             }
//         }
//     }, [toolbarVisible, editorHeight])

//     const toggleToolbarVisibility = () => {
//         setToolbarVisible(!toolbarVisible)
//     }

//     const handleImageUpload  = async (event) => {
//         try {
//             const formData = new FormData()
//             const file = event.target.files[0]
//             formData.append('image', file)

//             const { data } = await axios.post('/uploads', formData)

//             const quillInstance = quill.current.getEditor()
//             const range = quillInstance.getSelection(true)

//             if (range) {
//                 const imageUrl = process.env.REACT_APP_API_URL + data.url

//                 quillInstance.insertEmbed(range.index, 'image', imageUrl, 'user')
    
//                 quillInstance.setSelection(range.index + 1)
    
//                 const htmlContent = quillInstance.root.innerHTML
//                 onChange(htmlContent)
//             }

//         } catch (err) {
//             console.warn(err)
//         }
//     }

//     return (
//         <div className='position-relative'>
//             <ReactQuill
//                 className={`editor-text`}
//                 value={value}
//                 onChange={onChange}
//                 modules={modules}
//                 formats={formats}
//                 ref={quill}
//             />
//             {editorHeight === 0 && (
//                 <div className='position-relative'>
//                     <div className='d-flex align-items-center gap-3 position-absolute right-0 ' style={{right: '10px', bottom: '11px'}}>
//                         <FiArrowUp size={23} style={{cursor: 'pointer', color: 'rgb(148,148,148)'}}  
//                             onClick={toggleToolbarVisibility}  
//                         />
//                         <BsCardImage 
//                             size={21} 
//                             style={{cursor: 'pointer', color: 'rgb(148,148,148)'}} 
//                             onClick={() => inputFileRef.current.click()} />
//                         <input ref={inputFileRef} type='file' onChange={ handleImageUpload } accept='image/*' hidden />
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }


import React, { useRef, useMemo, useCallback, useEffect } from 'react'
import ReactQuill from 'react-quill'
import hljs from 'highlight.js'
import axios from '../../utils/axios'
import 'highlight.js/styles/atom-one-dark.css'
import 'react-quill/dist/quill.snow.css'
import './TextEditor.scss'

hljs.configure({
    languages: ['javascript', 'ruby', 'python', 'rust', 'java', 'html', 'css', 'php', 'csharp', 'go', 'sql'],
})

export const TextEditor = ({ value, onChange, theme, readOnly, minHeightEditor, maxHeightEditor }) => {
    const quillRef = useRef(null)

    const imageHandler = useCallback(() => {
        const inputFile = document.createElement('input')
        inputFile.setAttribute('type', 'file')
        inputFile.setAttribute('accept', 'image/*')
        inputFile.click()
    
        inputFile.addEventListener('change', async (event) => {
            try {
                const file = event.target.files[0]
                const formData = new FormData()
                formData.append('image', file)
        
                const response = await axios.post('/uploads', formData)
                const url = process.env.REACT_APP_API_URL + response.data.url

                const quill = quillRef.current.getEditor()
                const range = quill.getSelection(true)

                quill.insertEmbed(range.index, 'image', url)
                quill.setSelection(range.index + 1)
            } catch (err) {
                console.log('Помилка при завантаженні зображення: ', err)
            }
        })
    }, [quillRef])

    const modules = useMemo(() => ({
        syntax: {
            highlight: (text) => hljs.highlightAuto(text).value,
        },
        toolbar: {
            container: [
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                ['link', 'image', 'code-block'],
                ['clean'],
            ],
            handlers: {
                image: imageHandler,
            },
        },
        clipboard: {
            matchVisual: false,
        },
    }), [imageHandler])
    
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
        const quill = quillRef.current.getEditor()
        const editor = quill.root
        const editorStyle = editor.style
      
        if (minHeightEditor) {
            editorStyle.minHeight = `${minHeightEditor}px`
        }
      
        if (maxHeightEditor) {
            editorStyle.maxHeight = `${maxHeightEditor}px`
        }
      
        return () => {
            editorStyle.minHeight = null
            editorStyle.maxHeight = null
        }
      }, [minHeightEditor, maxHeightEditor])

    return (
        <ReactQuill
            ref={quillRef}
            value={value}
            onChange={onChange}
            modules={modules}
            formats={formats}
            theme={theme}
            readOnly={readOnly}
        />
    )
}

export default TextEditor
