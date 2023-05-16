const mongoose = require('mongoose')
const mongooseSlugPlugin = require('mongoose-slug-plugin')
const { dateFormatter } = require('../utils')

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100,
    },
    body: {
        type: String,
        required: true,
        maxlength: 20000,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now,
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
    }]
})

questionSchema.plugin(mongooseSlugPlugin, { tmpl: '<%=title%>' })

questionSchema.virtual('formattedCreatedAt').get(function () {
    return dateFormatter(this.createdAt)
})
  
questionSchema.virtual('formattedUpdatedAt').get(function () {
    return dateFormatter(this.updatedAt)
})
  
questionSchema.set('toJSON', { 
    virtuals: true,
    transform: (doc , ret) => {
        // delete ret.createdAt
        // delete ret.updatedAt
        delete ret._id
    } 
})

const Question = mongoose.model('questions', questionSchema)

module.exports = Question