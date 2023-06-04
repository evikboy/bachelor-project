const mongoose = require('mongoose')

const ReputationEventSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    voter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reputation: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        enum: ['Voting for question', 'Voting for answer', 'Accepted answer'],
        required: true
    },
    relatedQuestion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    },
    relatedAnswer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
    },
    acceptedAnswer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
})

const ReputationEvent = mongoose.model('reputationEvents', ReputationEventSchema)

module.exports = ReputationEvent