const express = require('express');
const router = express.Router();
const auth = require('../services/auth');

router.post('/api/v1/register', auth.registerUser);
router.post('/api/v1/login', auth.loginUser);
router.get('/api/v1/logout', auth.signOut);

module.exports = router;