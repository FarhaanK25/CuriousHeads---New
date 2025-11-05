const Contest = require('../models/Contest');
const Notification = require('../models/Notification');

exports.listContests = async (req, res) => {
  const contests = await Contest.find().sort({ startDate: -1 });
  res.json(contests);
};

exports.register = async (req, res) => {
  const { id } = req.params;
  const contest = await Contest.findById(id);
  if (!contest) return res.status(404).json({ message: 'Not found' });
  if (!contest.participants.includes(req.user._id)) {
    contest.participants.push(req.user._id);
    await contest.save();
    await Notification.create({ user: req.user._id, type: 'contest_registration', message: `Registered for ${contest.title}`, refId: contest._id });
  }
  res.json({ message: 'Registered' });
};

exports.submit = async (req, res) => {
  const { id } = req.params;
  const contest = await Contest.findById(id);
  if (!contest) return res.status(404).json({ message: 'Not found' });
  const fileUrl = req.file ? `/uploads/contests/${req.file.filename}` : null;
  contest.submissions.push({ user: req.user._id, submissionLink: fileUrl || req.body.text });
  await contest.save();
  await Notification.create({ user: req.user._id, type: 'contest_submission', message: `Submitted to ${contest.title}`, refId: contest._id });
  res.json({ message: 'Submitted' });
};

exports.leaderboard = async (req, res) => {
  const { id } = req.params;
  const contest = await Contest.findById(id).populate('submissions.user', 'name');
  if (!contest) return res.status(404).json({ message: 'Not found' });
  const leaderboard = contest.submissions.map(s => ({ user: s.user.name, submissionLink: s.submissionLink, submittedAt: s.createdAt }));
  res.json(leaderboard);
};
