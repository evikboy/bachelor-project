import { Layout } from "./components/Layout"
import { Routes, Route } from 'react-router-dom'

import { MainPage } from './pages/MainPage'
import { QuestionPage } from './pages/QuestionPage'
import { AddQuestionPage } from './pages/AddQuestionPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getMe } from "./redux/slices/auth/authSlice"

function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getMe())
	}, [])

	return (
		<Routes>
			<Route path='/' element={<Layout><MainPage /></Layout>} />
			<Route path='/questions' element={<Layout><QuestionPage /></Layout>} />
			<Route path='/ask' element={<Layout><AddQuestionPage /></Layout>} />
			<Route path='/register' element={<Layout isAuthPage={true}><RegisterPage /></Layout>} />
			<Route path='/login' element={<Layout isAuthPage={true}><LoginPage /></Layout>} />
		</Routes>
	)
}

export default App
