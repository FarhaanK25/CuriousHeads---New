const Group = require('../models/Group');
const Notification = require('../models/Notification');

exports.createGroup = async (req, res) => {
  const { name, college, department, isPrivate } = req.body;
  const code = isPrivate ? Math.random().toString(36).slice(2,8) : null;
  const g = await Group.create({ name, college, department, isPrivate, groupCode: code, members: [req.user._id] });
  res.json(g);
};

exports.joinByCode = async (req, res) => {
  const { groupCode } = req.body;
  const g = await Group.findOne({ groupCode });
  if (!g) return res.status(404).json({ message: 'Not found' });
  if (g.members.includes(req.user._id)) return res.status(400).json({ message: 'Already a member' });
  g.members.push(req.user._id);
  await g.save();
  res.json({ message: 'Joined', group: g });
};

exports.discover = async (req, res) => {
  const { college, department } = req.query;
  const filter = {};
  if (college) filter.college = college;
  if (department) filter.department = department;
  const groups = await Group.find(filter).select('name college department type isPrivate');
  res.json(groups);
};

// Feed & posts
exports.createPost = async (req, res) => {
  const { groupId, content } = req.body;
  const group = await Group.findById(groupId);
  if (!group) return res.status(404).json({ message: 'Group not found' });
  const post = { user: req.user._id, content };
  group.posts.push(post);
  await group.save();
  const otherMembers = group.members.filter(m => m.toString() !== req.user._id.toString());
  for (const memberId of otherMembers) {
    await Notification.create({ user: memberId, type: 'group_post', message: `${req.user.name} posted in ${group.name}`, refId: group._id });
  }
  res.status(201).json({ message: 'Post created', post: group.posts[group.posts.length-1] });
};

exports.toggleLikePost = async (req, res) => {
  const { groupId, postId } = req.body;
  const group = await Group.findById(groupId);
  const post = group.posts.id(postId);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  const userId = req.user._id.toString();
  if (post.likes.includes(userId)) post.likes.pull(userId);
  else {
    post.likes.push(req.user._id);
    if (post.user.toString() !== userId) {
      await Notification.create({ user: post.user, type: 'post_like', message: `${req.user.name} liked your post`, refId: post._id });
    }
  }
  await group.save();
  res.json({ message: 'Like toggled', likes: post.likes.length });
};

exports.addComment = async (req, res) => {
  const { groupId, postId, content } = req.body;
  const group = await Group.findById(groupId);
  const post = group.posts.id(postId);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  const comment = { user: req.user._id, content };
  post.comments.push(comment);
  await group.save();
  if (post.user.toString() !== req.user._id.toString()) {
    await Notification.create({ user: post.user, type: 'post_comment', message: `${req.user.name} commented on your post`, refId: post._id });
  }
  res.status(201).json({ message: 'Comment added', comment: post.comments[post.comments.length-1] });
};

exports.getFeed = async (req, res) => {
  const { groupId } = req.params;
  const group = await Group.findById(groupId).populate('posts.user', 'name').populate('posts.comments.user', 'name');
  if (!group) return res.status(404).json({ message: 'Group not found' });
  res.json(group.posts.reverse());
};
