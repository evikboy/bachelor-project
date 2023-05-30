const express = require('express')
const router = express.Router()
const passport = require('passport')
const { VoteController } = require('../controllers')

router.get('/questions/:questionId/users/votes', passport.authenticate('jwt', { session: false }), VoteController.getUserVoteForQuestion)
router.get('/answers/users/votes', passport.authenticate('jwt', { session: false }), VoteController.getUserVotesForAnswers)
router.post('/questions/:questionId/votes', passport.authenticate('jwt', { session: false }), VoteController.voteQuestion)
router.post('/answers/:answerId/votes', passport.authenticate('jwt', { session: false }), VoteController.voteAnswer)

module.exports = router