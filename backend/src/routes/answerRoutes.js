const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answerController');
const auth = require('../middlewares/auth');

router.post('/', auth, answerController.addAnswer);
router.post('/:id/upvote', auth, answerController.toggleUpvote);

module.exports = router;
