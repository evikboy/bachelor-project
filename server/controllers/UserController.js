const conf = require('../config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { secret, expiresIn } = conf.jwt
const { User, Question, Answer, Vote } = require('../models')
const { errorWrapper, errorGenerator } = require('../errors')

const login = errorWrapper(async (req, res) => {
    const { email, password } = req.body
    const existingUser = await User.findOne({ email })

    if (!existingUser) errorGenerator({ statusCode: 401, message: 'Невірна адреса пошти або пароль'})
            
    const passwordMatch = await bcrypt.compare(password, existingUser.password)

    if (!passwordMatch) errorGenerator({ statusCode: 401, message: 'Невірна адреса пошти або пароль'})
        
    const token = jwt.sign(
        { userId: existingUser._id, username: existingUser.username, email: existingUser.email }, 
        secret,
        { expiresIn: expiresIn }
    )

    return res.status(200).json({ 
        user: existingUser,
        token: `Bearer ${token}`
    })
})

const register = errorWrapper(async (req, res) => {
    const { email, username, password } = req.body
    const existingEmail = await User.findOne({ email })
    const existingUsername = await User.findOne({ username })
  
    if (existingEmail) errorGenerator({ statusCode: 409, message: 'Пошта все зайнята. Спробуйте іншу'})

    if (existingUsername) errorGenerator({ statusCode: 409, message: 'Логін вже зайнятий. Спробуйте інший'})
        
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
        email,
        username,
        password: hashedPassword
    })

    const savedUser = await newUser.save()

    const token = jwt.sign(
        { userId: newUser._id, username: newUser.username, email: newUser.email }, 
        secret,
        { expiresIn: expiresIn }
    )

    return res.status(201).json({
        user: savedUser,
        token: `Bearer ${token}`
    })
})

const getMe = errorWrapper(async (req, res) => {
    const user = await User.findById(req.user.id)

    if (!user) errorGenerator({ statusCode: 404, message: "Користувач не знайдений"})

    const token = jwt.sign(
        { userId: user._id, username: user.username, email: user.email }, 
        secret,
        { expiresIn: expiresIn }
    )

    return res.status(200).json({
        user: user,
        token: token
    })
})

const getUserQuestions = errorWrapper(async (req, res) => {
    const userId = req.user.id

    const questions = await Question.find({ user: userId })
        .populate('user', 'username avatarUrl')
        .populate('tags')
    .sort({ createdAt: -1 })
    
    if (!questions) errorGenerator({ statusCode: 404, message: 'Питання не знайдені'})

    res.status(200).json({ questions })
})

const getUserAnswers = errorWrapper(async (req, res) => {
    const userId = req.user.id

    const answers = await Answer.find({ user: userId })
        .populate('question', 'title tags')
        .populate({
            path: 'question',
            select: 'title',
            populate: {
                path: 'tags',
                select: 'name',
            }
        })
    .sort({ createdAt: -1 })

    if (!answers) errorGenerator({ statusCode: 404, message: 'Відповіді не знайдені'})

    res.status(200).json({ answers })
})

const getUserVotes = errorWrapper(async (req, res) => {
    const userId = req.user.id

    const votes = await Vote.find({ user: userId, voteType: { $ne: 'Novote' } })
    .sort({ updatedAt: -1 })

    if (!votes) errorGenerator({ statusCode: 404, message: 'Голоси не знайдені'})
  
    const formattedVotes = await Promise.all(
        votes.map(async (vote) => {
            const formattedVote = {
                targetType: vote.targetType,
                voteType: vote.voteType,
                user: vote.user,
                createdAt: vote.updatedAt,
            }
  
            if (vote.targetType === 'Question') {
                const question = await Question.findById(vote.targetId).populate('tags', 'name')
                if (question) {
                    formattedVote.target = {
                        _id: question._id,
                        questionTitle: question.title,
                        questionId: question._id,
                        tags: question.tags,
                        user: question.user,
                    }
                }
            } else if (vote.targetType === 'Answer') {
                const answer = await Answer.findById(vote.targetId)
                    .populate({
                        path: 'question',
                        select: 'title',
                        populate: {
                            path: 'tags',
                            select: 'name',
                    },
                })
                if (answer) {
                    formattedVote.target = {
                        _id: answer._id,
                        user: answer.user,
                        questionTitle: answer.question.title,
                        questionId: answer.question._id,
                        tags: answer.question.tags
                    }
                }
            }
  
            return formattedVote
        })
    )

    res.status(200).json({ votes: formattedVotes })
})

module.exports = {
    login,
    register,
    getMe,
    getUserQuestions,
    getUserAnswers,
    getUserVotes
}
