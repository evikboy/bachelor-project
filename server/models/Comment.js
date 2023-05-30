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
    parentType: {
        type: String,
        enum: ['answers', 'comments']
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comments'
    }],
}, { timestamps: true })

const Comment = mongoose.model('comments', commentSchema)

module.exports = Comment