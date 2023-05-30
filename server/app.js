const conf = require('./config')
const log_level = conf.log_level

const express = require('express')
const multer = require('multer')
const morgan = require('morgan')
const cors = require('cors')
const { errorHandler } = require('./middleware')
const passport = require('passport')
const routes = require('./routes')

const app = express()

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

app.set('view engine', 'ejs')

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(morgan(log_level))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/api/uploads', express.static('uploads'))

app.use('/api/', routes)

app.post('/api/uploads', passport.authenticate('jwt', { session: false }), upload.single('image'), (req, res) => {
    res.json({
        url: `uploads/${req.file.originalname}`
    })
})

app.use(errorHandler)

module.exports = app