const express = require('express')
const QuestionRouter = require('./QuestionRouter')
const AnswerRouter = require('./AnswerRouter')
const CommentRouter = require('./CommentRouter')
const TagRouter = require('./TagRouter')
const VoteRouter = require('./VoteRouter')
const UserRouter = require('./UserRouter')

const router = express.Router()

router.use('/questions', QuestionRouter)
router.use('/questions', AnswerRouter)
router.use('/questions', TagRouter)
router.use('', VoteRouter)
router.use('', CommentRouter)
router.use('/users', UserRouter)

module.exports = router