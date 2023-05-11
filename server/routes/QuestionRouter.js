const express = require('express')
const router = express.Router()
const passport = require('passport')
const { QuestionController } = require('../controllers')

router.get('/', QuestionController.getAll)
router.get('/:id', QuestionController.getById)
router.post('/', passport.authenticate('jwt', { session: false }), QuestionController.create)
router.delete('/:id', passport.authenticate('jwt', { session: false }), QuestionController.remove)
router.patch('/:id', passport.authenticate('jwt', { session: false }), QuestionController.update)

module.exports = router

