const { Question } = require('../models')
const { errorWrapper, errorGenerator } = require('../errors')

const getAll = errorWrapper(async (req, res) => {
    const { filter } = req.query

    let sortField
    if (filter === 'dob_question') {
        sortField = 'createdAt'
    } else if (filter === 'byLast_answer') {
        sortField = 'lastAnswerAt'
    } else if (filter === 'byNumber_views') {
        sortField = 'views'
    } else if (filter === 'byNumber_answers') {
        sortField = 'answersCount'
    } else if (filter === 'byNumber_votes') {
        sortField = { $subtract: ['$upvotes', '$downvotes'] }
    } else {
        sortField = 'createdAt'
    }
    
    const questions = await Question.aggregate([
        {
            $addFields: {
                answersCount: { $size: '$answers' },
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user',
            },
        },
        {
            $unwind: '$user',
        },
        {
            $lookup: {
                from: 'tags',
                localField: 'tags',
                foreignField: '_id',
                as: 'tags',
            },
        },
        {
            $lookup: {
                from: 'answers',
                localField: 'answers',
                foreignField: '_id',
                as: 'answers',
            },
        },
        {
            $addFields: {
                lastAnswerAt: { $max: '$answers.createdAt' },
            },
        },
        {
            $sort: {
                [sortField]: -1,
            },
        },
        {
            $project: {
                'user.password': 0,
                'user.email': 0,
                'user.createdAt': 0,
                'user.updatedAt': 0,
                'user.reputation': 0,
                'user.reputationEvents': 0,
                'votes': 0,
            }
        }
    ])
    
    if (!questions) errorGenerator(404, 'Питання не знайдені')
    
    res.status(200).json({ questions })

})

const getById = errorWrapper(async (req, res) => {
    const _id = req.params.questionId
    const userId = req.user

    let query = Question.findByIdAndUpdate(_id, { $inc: { views: 1 } })
    .populate('user', 'username avatarUrl')
    .populate('tags')

    if (userId) {
        query = query.populate({
            path: 'votes',
            match: { user: userId }
        })
    }

    const question = await query
    
    if (!question) errorGenerator({ statusCode: 404, message: 'Питання не знайдено'})

    res.status(200).json(question)
})

const create = errorWrapper(async (req, res) => {
    const { title, body } = req.body
    const userId = req.user.id

    const question = new Question({
        title, body,
        user: userId
    })
    await question.save()

    res.status(201).json(question)
})

const remove = errorWrapper(async (req, res) => {
    const _id = req.params.questionId

    const deletedQuestion = await Question.findOneAndDelete({ _id })

    if (!deletedQuestion) errorGenerator({ statusCode: 404, message: 'Question not found'})

    res.status(200).json(deletedQuestion)
})

const update = errorWrapper(async (req, res) => {
    const _id = req.params.questionId
    const { title, body } = req.body

    const updatedQuestion = await Question.findOneAndUpdate({ _id },
        { $set: { title, body, updatedAt: Date.now() }},
        { new: true }
    )

    if (!updatedQuestion) errorGenerator({ statusCode: 404, message: 'Question not found'})

    res.status(200).json(updatedQuestion)
})

module.exports = {
    getAll,
    getById,
    create,
    remove,
    update,
}