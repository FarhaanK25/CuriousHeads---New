const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  submissionLink: String,
  score: Number,
  createdAt: { type: Date, default: Date.now },
});

const contestSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  difficulty: String,
  prize: String,
  startDate: Date,
  endDate: Date,
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  submissions: [submissionSchema],
}, { timestamps: true });

module.exports = mongoose.model('Contest', contestSchema);
