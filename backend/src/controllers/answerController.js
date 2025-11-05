const Answer = require('../models/Answer');
const Question = require('../models/Question');
const Notification = require('../models/Notification');

exports.addAnswer = async (req, res) => {
  const { questionId, content } = req.body;
  const question = await Question.findById(questionId);
  if (!question) return res.status(404).json({ message: 'Question not found' });
  const answer = await Answer.create({ question: questionId, author: req.user._id, content });
  if (question.author.toString() !== req.user._id.toString()) {
    await Notification.create({ user: question.author, type: 'answer', message: `${req.user.name} answered your question`, refId: question._id });
  }
  res.json(answer);
};

exports.toggleUpvote = async (req, res) => {
  const { id } = req.params;
  const a = await Answer.findById(id);
  if (!a) return res.status(404).json({ message: 'Not found' });
  const userId = req.user._id.toString();
  const exists = a.upvotes.find(u => u.toString() === userId);
  if (exists) a.upvotes = a.upvotes.filter(u => u.toString() !== userId);
  else a.upvotes.push(req.user._id);
  await a.save();
  res.json({ upvotesCount: a.upvotes.length });
};
