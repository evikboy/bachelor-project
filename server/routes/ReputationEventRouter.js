const express = require('express')
const router = express.Router()
const { ReputationEventController } = require('../controllers')

router.post('/reputations', ReputationEventController.calculateReputationForPeriod)

module.exports = router
