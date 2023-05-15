const { Comment, Answer } = require('../models')
const { errorWrapper, errorGenerator } = require('../errors')

const getByAnswerId = errorWrapper(async (req, res) => {
    const { answerId } = req.params

    const comments = await Comment.find({ answer: answerId }).populate('user', 'username avatarUrl')

    if (!comments) errorGenerator({ statusCode: 404, message: 'Коментарі не знайдено'})

    res.status(200).json(comments)
})

const create = errorWrapper(async (req, res) => {
    const { answerId } = req.params
    const { body } = req.body
    const userId = req.user.id

    const comment = new Comment({
        body,
        answer: answerId,
        user: userId
    })
    await comment.save()

    const answer = await Answer.findById(answerId)

    if (!answer) errorGenerator({ statusCode: 404, message: 'Відповіді не знайдено'})

    answer.comments.push(comment._id)
    
    await answer.save()

    res.status(201).json(comment)
})

module.exports = {
    getByAnswerId,
    create
}