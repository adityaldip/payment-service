const User = require('../models/users');
const Transaction = require('../models/transaction');
const processTransaction = require('../services/transactionService');

module.exports = {
  async sendTransaction(request, reply) {
    const { amount, toAddress, currency } = request.body;
    const userId = request.user.userId;

    try {
      // Process the transaction
      await processTransaction({ amount, currency });

      // Deduct amount from user's balance
      await User.deductBalance(userId, amount);

      // Update transaction history
      await Transaction.createTransaction({ amount, toAddress, status: 'sent', userId, currency });

      reply.code(200).send({ message: 'Transaction sent successfully' });
    } catch (error) {
      console.error('Error sending transaction:', error);
      reply.code(500).send({ error: 'Internal server error' });
    }
  },

  async withdrawTransaction(request, reply) {
    const { amount, currency } = request.body;
    const userId = request.user.userId;

    try {
      // Process the transaction
      await processTransaction({ amount, currency });

      // Deduct amount from user's balance
      await User.deductBalance(userId, amount);

      // Update transaction history
      await Transaction.createTransaction({ amount, status: 'withdrawn', userId, currency });

      reply.code(200).send({ message: 'Transaction withdrawn successfully' });
    } catch (error) {
      console.error('Error withdrawing transaction:', error);
      reply.code(500).send({ error: 'Internal server error' });
    }
  },
};
