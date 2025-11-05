// index.js
require('dotenv').config();
const cors = require('cors');
require('express-async-errors');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const connectDB = require('./src/db/db');
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();

// helper: unwrap modules that were exported as ESM default
function unwrapModule(mod) {
  if (!mod) return mod;
  if (typeof mod === 'object' && Object.prototype.hasOwnProperty.call(mod, 'default')) {
    return mod.default;
  }
  return mod;
}

// helper: ensure a value looks like an Express router/middleware
function assertIsRouter(name, r) {
  if (!r) {
    throw new Error(`${name} is undefined or null`);
  }
  const t = typeof r;
  const looksLikeRouter = (t === 'function') || (t === 'object' && (r.handle || r.stack || r.use));
  if (!looksLikeRouter) {
    console.error(`${name} is not a valid router/middleware. typeof=${t}`, Object.keys(r || {}));
    throw new Error(`${name} must export an Express router (module.exports = router) or middleware function`);
  }
  return true;
}

// ------------------ Connect DB ------------------
connectDB();

// ------------------ Middlewares ------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })
);

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, process.env.UPLOAD_DIR || 'uploads')));

// ------------------ Load route modules ------------------
const rawAuth = require('./src/routes/authRoutes');
const rawQuestions = require('./src/routes/questionRoutes');
const rawAnswers = require('./src/routes/answerRoutes');
const rawNotes = require('./src/routes/notesRoutes');
const rawContests = require('./src/routes/contestRoutes');
const rawGroups = require('./src/routes/groupRoutes');
const rawNotifications = require('./src/routes/notificationRoutes');

const authRoutes = unwrapModule(rawAuth);
const questionRoutes = unwrapModule(rawQuestions);
const answerRoutes = unwrapModule(rawAnswers);
const notesRoutes = unwrapModule(rawNotes);
const contestRoutes = unwrapModule(rawContests);
const groupRoutes = unwrapModule(rawGroups);
const notificationRoutes = unwrapModule(rawNotifications);

// Validate before registering
try {
  assertIsRouter('authRoutes', authRoutes);
  assertIsRouter('questionRoutes', questionRoutes);
  assertIsRouter('answerRoutes', answerRoutes);
  assertIsRouter('notesRoutes', notesRoutes);
  assertIsRouter('contestRoutes', contestRoutes);
  assertIsRouter('groupRoutes', groupRoutes);
  assertIsRouter('notificationRoutes', notificationRoutes);
} catch (err) {
  console.error('Route validation failed:', err.message);
  process.exit(1);
}

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/answers', answerRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/contests', contestRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/notifications', notificationRoutes);

app.get('/api/health', (req, res) => res.json({ ok: true, time: new Date() }));

// Error handler
app.use(errorHandler);

// ------------------ Start server on fixed port ------------------
// Use PORT from .env, or default 5000
const desiredPort = parseInt(process.env.PORT, 10) || 5000;

// Start the server and handle binding errors explicitly
const server = app.listen(desiredPort, () => {
  console.log(`🚀 Server running on port ${desiredPort}`);
});

// catch listen errors (EADDRINUSE etc.)
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${desiredPort} is already in use. Please free this port or change PORT in your .env.`);
  } else {
    console.error('❌ Server failed to start:', err);
  }
  process.exit(1);
});
