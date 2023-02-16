const express = require('express');
const router = express.Router();
const Reward = require('../services/reward');

router.post('/api/v1/rewards', Reward.reward);
router.put('/api/v1/get_reward/:uid/:token', Reward.getReward);

module.exports = router;