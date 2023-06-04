const { Vote, Question, Answer, User, ReputationEvent } = require('../models')
const { errorWrapper, errorGenerator } = require('../errors')

const voteQuestion = errorWrapper(async (req, res) => {
    const { questionId } = req.params
    const { voteType } = req.body
    const userId = req.user.id

    const question = await Question.findById(questionId)

    if (question.user.toString() !== userId ) {
        let vote

        if (!question) errorGenerator({ statusCode: 404, message: 'Питання не знайдено'})
    
        const existingVote = await Vote.findOne({
            targetType: 'Question',
            targetId: questionId,
            user: userId
        })
    
        const author = await User.findById(question.user)
    
        if (!author) errorGenerator({ statusCode: 404, message: 'Автор питання не знайдений'})
    
        if (existingVote) {
      
            if (voteType === 'Upvote') {
                if (existingVote.voteType === 'Downvote') { question.downvotes--; author.reputation +=2 }
                question.upvotes++
                author.reputation +=10
            } else if (voteType === 'Downvote') {
                if (existingVote.voteType === 'Upvote') { question.upvotes--; author.reputation -=10 }
                question.downvotes++
                author.reputation -=2
            } else if (voteType === 'Novote') {
                if (existingVote.voteType === 'Upvote') { question.upvotes--; author.reputation -=10 }  
                else if (existingVote.voteType === 'Downvote') { question.downvotes--;  author.reputation +=2 }
            }
            existingVote.voteType = voteType
            vote = existingVote
        
        } else {
    
            if (voteType === 'Upvote') {
                question.upvotes++
                author.reputation +=10
            } else if (voteType === 'Downvote') {
                question.downvotes++
                author.reputation -=2
            }
    
            vote = new Vote({
                targetType: 'Question',
                targetId: questionId,
                voteType: voteType,
                user: userId
            })
            question.votes.push(vote)
        }
    
        vote.save()
        question.save()
        author.save()
    
        await ReputationEvent.findOneAndUpdate(
            {
                voter: userId,
                relatedQuestion: question._id,
                userId: question.user,
                reason: 'Voting for question'  
            },
            {
                $set: {
                    reputation: voteType === 'Upvote' ? 10 : (voteType === 'Novote' ? 0 : -2)
                }
            },
            { upsert: true }
        )
    
    
        res.status(200).json(vote)
    } else {
        errorGenerator({ statusCode: 403, message: 'Ви не можете голосувати за своє питання'})
    }

})

const voteAnswer = errorWrapper(async (req, res) => {
    const { answerId } = req.params
    const { voteType } = req.body
    const userId = req.user.id

    const answer = await Answer.findById(answerId)

    if (answer.user.toString() !== userId ) {
        let vote

        if (!answer) errorGenerator({ statusCode: 404, message: 'Відповіді не знайдено'})
    
        const existingVote = await Vote.findOne({
            targetType: 'Answer',
            targetId: answerId,
            user: userId
        })
    
        const author = await User.findById(answer.user)
    
        if (!author) errorGenerator({ statusCode: 404, message: 'Автор відповіді не знайдений'})
    
        if (existingVote) {
      
            if (voteType === 'Upvote') {
                if (existingVote.voteType === 'Downvote') { answer.downvotes--; author.reputation +=2 }
                answer.upvotes++
                author.reputation +=10
            } else if (voteType === 'Downvote') {
                if (existingVote.voteType === 'Upvote') { answer.upvotes--; author.reputation -=10 }
                answer.downvotes++
                author.reputation -=2
            } else if (voteType === 'Novote') {
                if (existingVote.voteType === 'Upvote') { answer.upvotes--; author.reputation -=10 }  
                else if (existingVote.voteType === 'Downvote') { answer.downvotes--;  author.reputation +=2 }
            }
            existingVote.voteType = voteType
            vote = existingVote
        
        } else {
    
            if (voteType === 'Upvote') {
                answer.upvotes++
                author.reputation +=10
            } else if (voteType === 'Downvote') {
                answer.downvotes++
                author.reputation -=2
            }
    
            vote = new Vote({
                targetType: 'Answer',
                targetId: answerId,
                voteType: voteType,
                user: userId
            })
            answer.votes.push(vote)
        }
    
        vote.save()
        answer.save()
        author.save()
    
        await ReputationEvent.findOneAndUpdate(
            {
                voter: userId,
                relatedQuestion: answer._id,
                userId: answer.user,
                reason: 'Voting for answer'  
            },
            {
                $set: {
                    reputation: voteType === 'Upvote' ? 10 : (voteType === 'Novote' ? 0 : -2)
                }
            },
            { upsert: true }
        )
    
    
        res.status(200).json(vote)
    } else {
        errorGenerator({ statusCode: 403, message: 'Ви не можете голосувати за свою відповідь'})
    }
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