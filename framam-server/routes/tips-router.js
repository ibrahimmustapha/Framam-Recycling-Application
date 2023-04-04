const express = require('express');
const router = express.Router();
const tips = require('../services/tips');

router.post('/api/v1/add-tip', tips.addNewTip);
router.get('/api/v1/tips', tips.getAllTips);
router.get('/api/v1/first-four-tips', tips.getFirstFourTips);

module.exports = router;
