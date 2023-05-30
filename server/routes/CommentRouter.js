const express = require('express')
const router = express.Router()
const passport = require('passport')
const { CommentController } = require('../controllers')

router.get('/answers/:answerId/comments', CommentController.getByAnswerId)
// router.post('/:answerId/comments', passport.authenticate('jwt', { session: false }), CommentController.create)
router.post('/:parentType/:parentId/comments', passport.authenticate('jwt', { session: false }), CommentController.create)

module.exports = router