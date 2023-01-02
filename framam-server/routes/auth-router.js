const express = require('express');
const router = express.Router();
const auth = require('../services/auth');

router.post('/api/v1/register', auth.registerUser);
router.post('/api/v1/login', auth.loginUser);
router.get('/test', auth.testExample);

module.exports = router;