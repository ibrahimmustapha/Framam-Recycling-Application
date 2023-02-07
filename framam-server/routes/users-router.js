const express = require('express');
const router = express.Router();
const users = require('../services/users');

router.get("/api/v1/users", users.getUsers);

module.exports = router;