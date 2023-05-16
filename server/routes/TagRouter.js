const express = require('express')
const router = express.Router()
const passport = require('passport')
const { TagController } = require('../controllers')

router.get('/:questionId/tags', TagController.getByQuestionId)
router.post('/:questionId/tags', passport.authenticate('jwt', { session: false }), TagController.create)

module.exports = router
