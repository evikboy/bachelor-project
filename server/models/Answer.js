const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'questions'
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comments'
    }]
})

const Answer = mongoose.model('answers', answerSchema)

module.exports = Answer