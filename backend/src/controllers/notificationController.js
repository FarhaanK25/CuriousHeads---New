const Notification = require('../models/Notification');

exports.list = async (req, res) => {
  const notifs = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(notifs);
};

exports.markRead = async (req, res) => {
  const { id } = req.params;
  await Notification.findByIdAndUpdate(id, { read: true });
  res.json({ message: 'ok' });
};
