// models/User.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

module.exports = {
  async createUser(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
  },

  async findUserByUsername(username) {
    return prisma.user.findUnique({
      where: { username },
    });
  },

  async validatePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  },

  async deductBalance(userId, amount) {
    // Retrieve user's current balance
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { balance: true },
    });

    // Calculate new balance after deducting the amount
    const newBalance = user.balance - amount;

    // Update user's balance
    await prisma.user.update({
      where: { id: userId },
      data: { balance: newBalance },
    });
  },
};
