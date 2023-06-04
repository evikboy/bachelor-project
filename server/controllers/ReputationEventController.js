const { ReputationEvent, User } = require('../models')
const { errorWrapper, errorGenerator } = require('../errors')
const moment = require('moment')

const calculateReputationForPeriod = errorWrapper(async (req, res) => {
    const { startDate, endDate } = req.body
  
    const startMoment = moment(startDate)
    const endMoment = moment(endDate)

    if (endMoment.isBefore(startMoment)) errorGenerator({ statusCode: 400, message: 'Неправильний діапазон дат' })

    let matchQuery = {}
    if (startMoment.isValid() && endMoment.isValid()) {
        matchQuery = {
            createdAt: { $gte: startMoment.toDate(), $lte: endMoment.toDate() }
        }
    }

    const users = await User.find(
        {},
        { username: 1, avatarUrl: 1}
    )

    const queries = users.map(user => {
        return ReputationEvent.aggregate([
            {
                $match: {
                    userId: user._id,
                    ...matchQuery
                }
            },
            {
                $group: {
                    _id: '$userId',
                    totalReputation: { $sum: '$reputation' }
                }
                
            }
        ])
    })

    const results = await Promise.all(queries)

    const reputations = results.map((result, index) => {
        if (result.length === 0) {
            return { reputationSum: 0, user: users[index] }
        } else {
            const { totalReputation } = result[0]
            return { reputationSum: totalReputation, user: users[index] }
        }
    })

    const sortedReputations = reputations.sort((a, b) => b.reputationSum - a.reputationSum)

    res.status(200).json(sortedReputations)
})

module.exports = {
    calculateReputationForPeriod
}