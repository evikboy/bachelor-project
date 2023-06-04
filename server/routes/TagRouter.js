const express = require('express')
const router = express.Router()
const passport = require('passport')
const { TagController } = require('../controllers')

router.get('/tags', TagController.getAll)
router.get('/questions/:questionId/tags', TagController.getByQuestionId)

router.post('/questions/:questionId/tags', passport.authenticate('jwt', { session: false }), TagController.create)

module.exports = router
