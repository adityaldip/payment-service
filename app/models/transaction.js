// models/transaction.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  async createTransaction({ amount, toAddress, status, userId,currency }) {
    return prisma.transaction.create({
      data: {
        amount,
        toAddress,
        status,
        currency,
        user: { connect: { id: userId } },
      },
    });
  },
};
