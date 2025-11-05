const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const auth = require('../middlewares/auth');

router.get('/', auth, notificationController.list);
router.post('/:id/read', auth, notificationController.markRead);

module.exports = router;
