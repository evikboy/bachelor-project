const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'questions'
    }
})

const Tag = mongoose.model('tags', tagSchema)

module.exports = Tag