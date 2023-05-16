const { Tag, Question } = require('../models')
const { errorWrapper, errorGenerator } = require('../errors')

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
        const tag = new Tag({
            name: tagName,
            question: questionId
        })
        await tag.save()
        createdTags.push(tag._id)
    }

    question.tags.push(...createdTags)
    await question.save()

    res.status(201).json(createdTags)
})

module.exports = {
    getByQuestionId,
    create
}