const conf = require('./config')
const log_level = conf.log_level

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { errorHandler } = require('./middleware')
const passport = require('passport')
const routes = require('./routes')
const app = express()

app.set('view engine', 'ejs')

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(morgan(log_level))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/', routes)

app.use(errorHandler)

module.exports = app