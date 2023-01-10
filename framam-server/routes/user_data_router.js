const express = require('express');
const router = express.Router();
const multer = require('multer');
const userDdata = require('../services/user_data');

const memoryStorage = multer.memoryStorage();
const upload = multer({ memoryStorage });

router.post('/api/v1/add_data', userDdata.addUserDetails);
router.get('/api/v1/all_user_data', userDdata.getUserDetails);
router.get('/api/v1/user/:uid', userDdata.getUserDetail);
router.post('/api/v1/add_photo', upload.single('photo'), userDdata.uploodPhoto)

module.exports = router;
