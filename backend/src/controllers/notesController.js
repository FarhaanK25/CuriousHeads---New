const multer = require('multer');
const path = require('path');
const Note = require('../models/Note');

const uploadDir = process.env.UPLOAD_DIR || 'uploads';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), uploadDir, 'notes'));
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

exports.uploadNoteMiddleware = upload.single('file');

exports.uploadNote = async (req, res) => {
  const { title, description, subject } = req.body;
  if (!req.file) return res.status(400).json({ message: 'File required' });
  const fileUrl = `/uploads/notes/${req.file.filename}`;
  const note = await Note.create({ title, description, subject, fileUrl, uploader: req.user._id });
  res.json(note);
};

exports.listNotes = async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 }).populate('uploader', 'name');
  res.json(notes);
};
