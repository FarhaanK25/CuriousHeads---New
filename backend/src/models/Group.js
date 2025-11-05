const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [CommentSchema],
  createdAt: { type: Date, default: Date.now },
});

const groupSchema = new mongoose.Schema({
  name: String,
  college: String,
  department: String,
  isPrivate: { type: Boolean, default: false },
  groupCode: String,
  type: { type: String, enum: ['college','department','interest'], default: 'college' },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  posts: [PostSchema],
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);
