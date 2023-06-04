import { Layout } from './components/Layout'
import { Routes, Route } from 'react-router-dom'

import { MainPage } from './pages/MainPage'
import { QuestionPage } from './pages/QuestionPage'
import { AddQuestionPage } from './pages/AddQuestionPage'
import { RankPage } from './pages/RankPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { TagsPage } from './pages/TagsPage'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getMe } from './redux/slices/auth/authSlice'
import { MyQuestionsPage } from './pages/MyQuestionsPage'
import { MyVotesPage } from './pages/MyVotesPage'
import { MyAnswersPage } from './pages/MyAnswersPage'

function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getMe())
	}, [dispatch])

	return (
		<Routes>
			<Route path='/' element={<Layout><MainPage /></Layout>} />
			<Route path='/questions/:questionId' element={<Layout><QuestionPage /></Layout>} />
			<Route path='/tags' element={<Layout><TagsPage /></Layout>} />
			<Route path='/ask' element={<Layout><AddQuestionPage /></Layout>} />
			<Route path='/ranks' element={<Layout><RankPage /></Layout>} />
			<Route path='/my-questions' element={<Layout><MyQuestionsPage /></Layout>} />
			<Route path='/my-answers' element={<Layout><MyAnswersPage /></Layout>} />
			<Route path='/my-votes' element={<Layout><MyVotesPage /></Layout>} />
			<Route path='/register' element={<Layout isAuthPage><RegisterPage /></Layout>} />
			<Route path='/login' element={<Layout isAuthPage><LoginPage /></Layout>} />
		</Routes>
	)
}

export default App
