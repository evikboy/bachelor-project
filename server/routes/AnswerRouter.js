const express = require('express')
const router = express.Router()
const passport = require('passport')
const { AnswerController } = require('../controllers')

router.get('/:questionId/answers', AnswerController.getByQuestionId)
router.post('/:questionId/answers', passport.authenticate('jwt', { session: false }), AnswerController.create)

module.exports = router