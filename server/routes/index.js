const express = require('express')
const QuestionRouter = require('./QuestionRouter')
const AnswerRouter = require('./AnswerRouter')
const CommentRouter = require('./CommentRouter')
const TagRouter = require('./TagRouter')
const UserRouter = require('./UserRouter')

const router = express.Router()

router.use('/questions', QuestionRouter)
router.use('/questions', AnswerRouter)
router.use('/questions', TagRouter)
router.use('/answers', CommentRouter)
router.use('/users', UserRouter)

module.exports = router;