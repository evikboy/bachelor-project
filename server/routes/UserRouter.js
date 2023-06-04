const express = require('express')
const router = express.Router()
const passport = require('passport')
const { UserController } = require('../controllers')

router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.get('/me', passport.authenticate('jwt', { session: false }), UserController.getMe)
router.get('/questions', passport.authenticate('jwt', { session: false }), UserController.getUserQuestions)
router.get('/answers', passport.authenticate('jwt', { session: false }), UserController.getUserAnswers)
router.get('/votes', passport.authenticate('jwt', { session: false }), UserController.getUserVotes)

module.exports = router