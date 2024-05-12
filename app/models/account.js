// models/User.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  async createAccount(userId, type) {
    return prisma.paymentAccount.create({
      data: {
        type,
        user: { connect: { id: userId } }, // Associate account with user
      },
    });
  },

  async getUserAccounts(userId) {
    return prisma.paymentAccount.findMany({
      where: { userId },
    });
  },
};
