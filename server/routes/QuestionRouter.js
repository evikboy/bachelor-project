const express = require('express')
const router = express.Router()
const passport = require('passport')
const { QuestionController } = require('../controllers')

router.get('/', QuestionController.getAll)
router.get('/:questionId', QuestionController.getById)
router.post('/', passport.authenticate('jwt', { session: false }), QuestionController.create)
router.delete('/:questionId', passport.authenticate('jwt', { session: false }), QuestionController.remove)
router.patch('/:questionId', passport.authenticate('jwt', { session: false }), QuestionController.update)

module.exports = router

