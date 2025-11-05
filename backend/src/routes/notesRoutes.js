const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');
const auth = require('../middlewares/auth');

router.get('/', notesController.listNotes);
router.post('/upload', auth, notesController.uploadNoteMiddleware, notesController.uploadNote);

module.exports = router;
