const { Question } = require('../models')
const { errorWrapper, errorGenerator } = require('../errors')

const getAll = errorWrapper(async (req, res) => {
    const questions = await Question.find()

    if (!questions) errorGenerator(404, 'Questions not found')

    res.status(200).json(questions)
})

const getById = errorWrapper(async (req, res) => {
    const _id = req.params.id

    const question = await Question.findById({ _id })
    
    if (!question) errorGenerator({ statusCode: 404, message: 'Question not found'})

    res.status(200).json(question)
})

const create = errorWrapper(async (req, res) => {
    const { title, body } = req.body
    const userId = req.user.id
    console.log(req.user)

    const question = new Question({
        title, body,
        user: userId
    })
    await question.save()

    res.status(201).json(question)
})

const remove = errorWrapper(async (req, res) => {
    const _id = req.params.id

    const deletedQuestion = await Question.findOneAndDelete({ _id })

    if (!deletedQuestion) errorGenerator({ statusCode: 404, message: 'Question not found'})

    res.status(200).json(deletedQuestion)
})

const update = errorWrapper(async (req, res) => {
    const _id = req.params.id
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
    update
}