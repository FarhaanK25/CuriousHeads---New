require('dotenv').config();
const cors = require('cors');
require('express-async-errors');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const getPort = require('get-port'); // ✅ auto-port finder

const connectDB = require('./src/db/db');
const authRoutes = require('./src/routes/authRoutes').default || require('./src/routes/authRoutes');
const questionRoutes = require('./src/routes/questionRoutes');
const answerRoutes = require('./src/routes/answerRoutes');
const notesRoutes = require('./src/routes/notesRoutes');
const contestRoutes = require('./src/routes/contestRoutes');
const groupRoutes = require('./src/routes/groupRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();

// ✅ Connect DB
connectDB();

// ✅ Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// ✅ Static uploads
app.use('/uploads', express.static(path.join(__dirname, process.env.UPLOAD_DIR || 'uploads')));

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/answers', answerRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/contests', contestRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/notifications', notificationRoutes);

// ✅ Health check
app.get('/api/health', (req, res) => res.json({ ok: true, time: new Date() }));

// ✅ Error handler
app.use(errorHandler);

// ✅ Smart port handling (5000 busy → pick next)
(async () => {
  const PORT = 5001;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})();
