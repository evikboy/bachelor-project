const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: '',
        required: false
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'questions'
    },
    questionCount: {
        type: Number,
        default: 0
    }
})

const Tag = mongoose.model('tags', tagSchema)

module.exports = Tag