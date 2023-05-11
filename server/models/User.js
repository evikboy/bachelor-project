const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatarUrl: {
        type: String,
        default: 'default-avatar.jpg'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    reputation: {
        type: Number,
        default: 0
    }
})

userSchema.set('toJSON', { 
    virtuals: true,
    transform: (doc , ret) => {
        delete ret.password
        delete ret._id
    } 
})

const User = mongoose.model('users', userSchema)

module.exports = User