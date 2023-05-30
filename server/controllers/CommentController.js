const { Comment, Answer } = require('../models')
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
    const { body } = req.body
    const userId = req.user.id

    let parentEntity

    if (parentType === 'answers') {
        parentEntity = await Answer.findById(parentId)
    } else if (parentType === 'comments') {
        parentEntity = await Comment.findById(parentId)
    } else {
        errorGenerator({ statusCode: 400, message: 'Недійсний parentType' })
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

    console.log(userId)
    console.log(comment)

    await comment.save()
    await comment.populate('user', 'username avatarUrl')

    parentEntity.comments.push(comment._id)
    await parentEntity.save()

    res.status(201).json(comment)


    // const { answerId } = req.params
    // const { body } = req.body
    // const userId = req.user.id

    // const comment = new Comment({
    //     body,
    //     answer: answerId,
    //     user: userId
    // })
    // await comment.save()
    // await comment.populate('user', 'username avatarUrl')

    // const answer = await Answer.findById(answerId)

    // if (!answer) errorGenerator({ statusCode: 404, message: 'Відповіді не знайдено'})

    // answer.comments.push(comment._id)
    
    // await answer.save()

    // res.status(201).json(comment)
})

module.exports = {
    getByAnswerId,
    create
}