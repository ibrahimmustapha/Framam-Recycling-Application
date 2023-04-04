const express = require('express');
const router = express.Router();
const Messages = require('../services/messages');

router.post('/api/v1/message/:uid', Messages.sendMessage);
router.get('/api/v1/messages', Messages.allMessages);

module.exports = router;