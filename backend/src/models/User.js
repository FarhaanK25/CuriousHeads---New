const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  name: String,
  level: Number,
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  stream: String,
  college: String,
  year: String,
  xp: { type: Number, default: 0 },
  badges: [badgeSchema],
  role: { type: String, enum: ['user','admin'], default: 'user' },
  profilePic: String,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
