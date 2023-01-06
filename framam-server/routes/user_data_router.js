const express = require('express');
const router = express.Router();
const userDdata = require('../services/user_data');

router.post('/api/v1/add_data', userDdata.addUserDetails);
router.get('/api/v1/all_user_data', userDdata.getUserDetails);

module.exports = router;
