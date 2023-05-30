const mongoose = require('mongoose')
const mongooseSlugPlugin = require('mongoose-slug-plugin')

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    views: {
        type: Number,
        default: 0
    },
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'answers'
    }],
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tags'
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

questionSchema.plugin(mongooseSlugPlugin, { tmpl: '<%=title%>' })
  
questionSchema.set('toJSON', { 
    virtuals: true,
    transform: (doc , ret) => {
        delete ret._id
    } 
})

const Question = mongoose.model('questions', questionSchema)

module.exports = Question