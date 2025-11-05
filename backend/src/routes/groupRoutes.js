const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const auth = require('../middlewares/auth');

router.get('/', groupController.discover);
router.post('/', auth, groupController.createGroup);
router.post('/join', auth, groupController.joinByCode);
router.get('/:groupId/feed', auth, groupController.getFeed);
router.post('/post', auth, groupController.createPost);
router.post('/post/like', auth, groupController.toggleLikePost);
router.post('/post/comment', auth, groupController.addComment);

module.exports = router;
