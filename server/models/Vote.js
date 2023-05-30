const mongoose = require('mongoose')

const voteSchema = new mongoose.Schema({
    targetType: {
        type: String,
        enum: ['Question', 'Answer', 'Comment'],
        required: true
    },
    targetId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    voteType: {
        type: String,
        enum: ['Upvote', 'Downvote', 'Novote'],
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true })

const Vote = mongoose.model('votes', voteSchema)

module.exports = Vote