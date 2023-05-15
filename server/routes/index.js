const express = require('express')
const QuestionRouter = require('./QuestionRouter')
const AnswerRouter = require('./AnswerRouter')
const CommentRouter = require('./CommentRouter')
const UserRouter = require('./UserRouter')

const router = express.Router()

router.use('/questions', QuestionRouter)
router.use('/questions', AnswerRouter)
router.use('/answers', CommentRouter)
router.use('/users', UserRouter)

module.exports = router;