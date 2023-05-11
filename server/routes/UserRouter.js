const express = require('express')
const router = express.Router()
const passport = require('passport')
const { UserController } = require('../controllers')

router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.get('/me', passport.authenticate('jwt', { session: false }), UserController.getMe)

module.exports = router