const express = require('express');
const router = express.Router();
const multer = require('multer');
const userDdata = require('../services/user_data');

const memoryStorage = multer.memoryStorage();
const upload = multer({ memoryStorage });

router.get('/api/v1/user/:uid', userDdata.getUserDetail);
router.get('/api/v1/most-points', userDdata.userWithMostPoints);
router.post('/api/v1/add_photo', upload.single('photo'), userDdata.uploadPhoto);

module.exports = router;
