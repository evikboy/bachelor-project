const { Comment, Answer, User } = require('../models')
const { errorWrapper, errorGenerator } = require('../errors')

const getByAnswerId = errorWrapper(async (req, res) => {
    const { answerId } = req.params

    const retrieveAllComments = async (parentId) => {
        const comments = await Comment.find({ parentId }).populate('user', 'username avatarUrl').sort({ createdAt: 1 })
    
        const childComments = await Promise.all(
            comments.map(comment => retrieveAllComments(comment._id))
        )
    
        const flattenedChildComments = childComments.flat()
    
        return [...comments, ...flattenedChildComments].sort((a, b) => a.createdAt - b.createdAt)
    }
    const allComments = await retrieveAllComments(answerId)
    
    res.status(200).json(allComments)
})

const create = errorWrapper(async (req, res) => {
    const { parentId, parentType } = req.params
    const { body, answerId } = req.body
    const userId = req.user.id

    const user = await User.findById(userId)

    if (user.reputation < 50) errorGenerator({ statusCode: 403, message: 'У вас недостатньо репутації для відправки коментарів' })

    let parentEntity
    let answerEntity

    if (parentType === 'answers') {
        parentEntity = await Answer.findById(parentId)
    } else if (parentType === 'comments') {
        parentEntity = await Comment.findById(parentId)
    } else {
        errorGenerator({ statusCode: 400, message: 'Недійсний parentType' })
    }

    answerEntity = await Answer.findById(answerId)

    if (!answerEntity) {
        errorGenerator({ statusCode: 404, message: 'Answer entity не знайдено' })
    }

    if (!parentEntity) {
        errorGenerator({ statusCode: 404, message: 'Parent entity не знайдено' })
    }

    const comment = new Comment({
        body,
        parentType,
        parentId,
        user: userId
    })

    await comment.save()
    await comment.populate('user', 'username avatarUrl')

    parentEntity.comments.push(comment._id)
    await parentEntity.save()

    answerEntity.commentsCount += 1
    await answerEntity.save()

    res.status(201).json(comment)
})

module.exports = {
    getByAnswerId,
    create
}