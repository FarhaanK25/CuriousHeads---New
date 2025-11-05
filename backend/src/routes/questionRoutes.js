const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const auth = require('../middlewares/auth');

router.post('/', auth, questionController.createQuestion);
router.get('/', questionController.getQuestions);
router.get('/:id', questionController.getQuestionDetail);
router.post('/:id/upvote', auth, questionController.toggleUpvote);

module.exports = router;
