const express = require('express')
const jwt = require('jsonwebtoken')
const conf = require('../config')
const router = express.Router()
const passport = require('passport')
const { QuestionController } = require('../controllers')

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

router.get('/', QuestionController.getAll)
router.get('/:questionId', getUserIdFromToken, QuestionController.getById)
router.post('/', passport.authenticate('jwt', { session: false }), QuestionController.create)
router.delete('/:questionId', passport.authenticate('jwt', { session: false }), QuestionController.remove)
router.patch('/:questionId', passport.authenticate('jwt', { session: false }), QuestionController.update)

module.exports = router

