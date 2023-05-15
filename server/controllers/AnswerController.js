const { Answer, Question } = require('../models')
const { errorWrapper, errorGenerator } = require('../errors')

const getByQuestionId = errorWrapper(async (req, res) => {
    const { questionId } = req.params
    console.log(questionId)

    const answers = await Answer.find({ question: questionId }).populate('user comments', 'username avatarUrl')

    if (!answers) errorGenerator({ statusCode: 404, message: 'Відповіді не знайдено'})

    res.status(200).json(answers)
})

const create = errorWrapper(async (req, res) => {
    const { questionId } = req.params
    const { body } = req.body
    const userId = req.user.id

    const answer = new Answer({
        body,
        question: questionId,
        user: userId
    })
    await answer.save()

    const question = await Question.findById(questionId)

    if (!question) errorGenerator({ statusCode: 404, message: 'Питання не знайдено'})

    question.answers.push(answer._id)
    
    await question.save()

    res.status(201).json(answer)
})

module.exports = {
    getByQuestionId,
    create
}