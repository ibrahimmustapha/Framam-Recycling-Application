const express = require('express');
const router = express.Router();
const multer = require('multer');
const task = require('../services/task');

const memoryStorage = multer.memoryStorage();
const upload = multer({ memoryStorage });

router.post('/api/v1/add_task', task.addNewTask);
router.get('/api/v1/all_task', task.getAllTasks);
router.get('/api/v1/task/:uid', task.getAllTasks);
router.post('/api/v1/add_task_photos', upload.single('photo'), task.uploadPhoto);

module.exports = router;
