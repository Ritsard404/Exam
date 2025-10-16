const bcrypt = require('bcryptjs');
const User = require('../models/user');

async function seedUsers() {
  const existing = await User.findOne({ where: { email: 'test@example.com' } });
  if (existing) {
    console.log('Default user already exists');
    return;
  }

  const hashed = await bcrypt.hash('password123', 10);
  await User.create({ email: 'test@example.com', password: hashed });

  console.log('Default user seeded: test@example.com / password123');
}

module.exports = { seedUsers };
