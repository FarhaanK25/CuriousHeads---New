const Question = require('../models/Question');
const Answer = require('../models/Answer');

exports.createQuestion = async (req, res) => {
  const { title, description, topic, tags, difficulty } = req.body;
  const q = await Question.create({ title, description, topic, tags: tags || [], difficulty, author: req.user._id });
  res.json(q);
};

exports.getQuestions = async (req, res) => {
  const { page = 1, limit = 10, topic, search, difficulty } = req.query;
  const filter = {};
  if (topic) filter.topic = topic;
  if (difficulty) filter.difficulty = difficulty;
  if (search) filter.$or = [{ title: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }];
  const skip = (page - 1) * limit;
  const total = await Question.countDocuments(filter);
  const questions = await Question.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)).populate('author', 'name');
  res.json({ total, page: Number(page), questions });
};

exports.getQuestionDetail = async (req, res) => {
  const { id } = req.params;
  const question = await Question.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true }).populate('author', 'name');
  if (!question) return res.status(404).json({ message: 'Not found' });
  const answers = await Answer.find({ question: id }).populate('author', 'name');
  res.json({ question, answers });
};

exports.toggleUpvote = async (req, res) => {
  const { id } = req.params;
  const q = await Question.findById(id);
  if (!q) return res.status(404).json({ message: 'Not found' });
  const userId = req.user._id.toString();
  const exists = q.upvotes.find(u => u.toString() === userId);
  if (exists) q.upvotes = q.upvotes.filter(u => u.toString() !== userId);
  else q.upvotes.push(req.user._id);
  await q.save();
  res.json({ upvotesCount: q.upvotes.length });
};
