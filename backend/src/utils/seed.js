require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../db/db');
const User = require('../models/User');

(async () => {
  await connectDB();
  await User.deleteMany({});
  const hashed = await bcrypt.hash('password123', 10);
  const admin = await User.create({ name: 'Admin', email: 'admin@curiousheads.com', password: hashed, role: 'admin' });
  const alice = await User.create({ name: 'Alice', email: 'alice@example.com', password: hashed, college: 'ABC College' });
  const bob = await User.create({ name: 'Bob', email: 'bob@example.com', password: hashed, college: 'ABC College' });
  console.log('Seed done:', [admin.email, alice.email, bob.email]);
  process.exit(0);
})();
