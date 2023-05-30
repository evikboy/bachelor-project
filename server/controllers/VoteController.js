const { Vote, Question, Answer } = require('../models')
const { errorWrapper, errorGenerator } = require('../errors')

const voteQuestion = errorWrapper(async (req, res) => {
    const { questionId } = req.params
    const { voteType } = req.body
    const userId = req.user.id

    const question = await Question.findById(questionId)

    if (!question) errorGenerator({ statusCode: 404, message: 'Питання не знайдено'})

    const existingVote = await Vote.findOne({
        targetType: 'Question',
        targetId: questionId,
        user: userId
    })

    if (existingVote) {

        if (voteType === 'Upvote') {
            if (existingVote.voteType === 'Downvote') question.downvotes--
            question.upvotes++
        } else if (voteType === 'Downvote') {
            if (existingVote.voteType === 'Upvote') question.upvotes--
            question.downvotes++
        } else if (voteType === 'Novote') {
            if (existingVote.voteType === 'Upvote') question.upvotes--  
            else if (existingVote.voteType === 'Downvote') question.downvotes--
        }

        existingVote.voteType = voteType
        await existingVote.save()

        await question.save()

        return res.status(200).json(existingVote)
    }

    const vote = new Vote({
        targetType: 'Question',
        targetId: questionId,
        voteType: voteType,
        user: userId
    })
    await vote.save()

    if (voteType === 'Upvote') {
        question.upvotes++
    } else if (voteType === 'Downvote') {
        question.downvotes++
    }

    question.votes.push(vote)

    await question.save()

    res.status(200).json(vote)
})

const voteAnswer = errorWrapper(async (req, res) => {
    const { answerId } = req.params
    const { voteType } = req.body
    const userId = req.user.id

    const answer = await Answer.findById(answerId)

    if (!answer) errorGenerator({ statusCode: 404, message: 'Питання не знайдено'})

    const existingVote = await Vote.findOne({
        targetType: 'Answer',
        targetId: answerId,
        user: userId
    })

    if (existingVote) {

        if (voteType === 'Upvote') {
            if (existingVote.voteType === 'Downvote') answer.downvotes--
            answer.upvotes++
        } else if (voteType === 'Downvote') {
            if (existingVote.voteType === 'Upvote') answer.upvotes--
            answer.downvotes++
        } else if (voteType === 'Novote') {
            if (existingVote.voteType === 'Upvote') answer.upvotes--  
            else if (existingVote.voteType === 'Downvote') answer.downvotes--
        }

        existingVote.voteType = voteType
        await existingVote.save()

        await answer.save()

        return res.status(200).json(existingVote)
    }

    const vote = new Vote({
        targetType: 'Answer',
        targetId: answerId,
        voteType: voteType,
        user: userId
    })
    await vote.save()

    if (voteType === 'Upvote') {
        answer.upvotes++
    } else if (voteType === 'Downvote') {
        answer.downvotes++
    }

    answer.votes.push(vote)

    await answer.save()

    res.status(200).json(vote)
})

const getUserVoteForQuestion = async (req, res) => {
    const { questionId } = req.params
    const userId = req.user.id

    const vote = await Vote.findOne({
        targetType: 'Question',
        targetId: questionId,
        user: userId
    })
    
    if (!vote) return res.status(200).json({ voteType: 'Novote'})
    
    res.status(200).json(vote)
}

const getUserVotesForAnswers = errorWrapper(async (req, res) => {
    const { answerIds } = req.body
    const userId = req.user.id
    
    const votes = await Vote.find({
        targetType: 'Answer',
        targetId: { $in: answerIds },
        user: userId
    })
    
    const userVotes = {}
    
    votes.forEach((vote) => {
        const answerId = vote.targetId.toString()
        userVotes[answerId] = vote.voteType
    })
    
    res.status(200).json(userVotes)
})

module.exports = {
    voteQuestion,
    voteAnswer,
    getUserVoteForQuestion,
    getUserVotesForAnswers
}