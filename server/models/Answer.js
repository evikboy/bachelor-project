const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
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
    }],
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    },
    votes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'votes'
    }]
}, { timestamps: true })

const Answer = mongoose.model('answers', answerSchema)

module.exports = Answer