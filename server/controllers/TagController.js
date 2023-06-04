const { Tag, Question } = require('../models')
const { errorWrapper, errorGenerator } = require('../errors')

const getAll = errorWrapper(async (req, res) => {
    const tags = await Tag.find()

    if (!tags) errorGenerator({ statusCode: 404, message: 'Теги не знайдено'})

    res.status(200).json(tags)
})

const getByQuestionId = errorWrapper(async (req, res) => {
    const { questionId } = req.params

    const tags = await Tag.find({ question: questionId })

    if (!tags) errorGenerator({ statusCode: 404, message: 'Теги не знайдено'})

    res.status(200).json(tags)
})

const create = errorWrapper(async (req, res) => {
    const { questionId } = req.params
    const { name } = req.body

    const tags = name.split(',').map(tag => tag.trim())

    const question = await Question.findById(questionId)

    if (!question) errorGenerator({ statusCode: 404, message: 'Питання не знайдено'})

    const createdTags = []

    for (const tagName of tags) {
        let tag = await Tag.findOne({ name: tagName })

        if (!tag) {
            tag = new Tag({
                name: tagName,
                question: questionId,
                questionCount: 1
            })
            await tag.save()
        } else {
            tag.questionCount++
            await tag.save()
        }

        createdTags.push(tag._id)
    }

    question.tags.push(...createdTags)
    await question.save()

    res.status(201).json(createdTags)
})

module.exports = {
    getAll,
    getByQuestionId,
    create
}