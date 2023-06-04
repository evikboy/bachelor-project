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
    reputation: {
        type: Number,
        default: 0
    },
    reputationEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ReputationEvent'
    }]
}, { timestamps: true })

userSchema.set('toJSON', { 
    virtuals: true,
    transform: (doc , ret) => {
        delete ret.password
        delete ret._id
    } 
})

const User = mongoose.model('users', userSchema)

module.exports = User