const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    answer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'answers'
    }
})

const Comment = mongoose.model('comments', commentSchema)

module.exports = Comment