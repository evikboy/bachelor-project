const express = require('express')
const QuestionRouter = require('./QuestionRouter')
const UserRouter = require('./UserRouter')

const router = express.Router()

router.use('/question', QuestionRouter);
router.use('/user', UserRouter);

module.exports = router;