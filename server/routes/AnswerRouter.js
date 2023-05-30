const express = require('express')
const jwt = require('jsonwebtoken')
const conf = require('../config')
const router = express.Router()
const passport = require('passport')
const { AnswerController } = require('../controllers')

const getUserIdFromToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (token) {
        try {
            const decoded = jwt.verify(token, conf.jwt.secret)
            req.user = decoded.userId
        } catch (err) {
            req.user = null
        }
    } else {
        req.user = null
    }
    next()
}


router.get('/:questionId/answers', getUserIdFromToken, AnswerController.getByQuestionId)
router.post('/:questionId/answers', passport.authenticate('jwt', { session: false }), AnswerController.create)

module.exports = router