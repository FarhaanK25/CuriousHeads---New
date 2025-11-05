const express = require('express');
const router = express.Router();
const contestController = require('../controllers/contestController');
const auth = require('../middlewares/auth');

router.get('/', contestController.listContests);
router.post('/:id/register', auth, contestController.register);
router.post('/:id/submit', auth, contestController.submit);
router.get('/:id/leaderboard', auth, contestController.leaderboard);

module.exports = router;
