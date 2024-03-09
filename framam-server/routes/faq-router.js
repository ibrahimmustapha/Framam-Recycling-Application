const express = require('express');
const router = express.Router();
const faq = require('../services/faq');

router.post('/api/v1/add_question', faq.addQuestion);
router.get('/api/v1/questions', faq.allQuestion);

module.exports = router;