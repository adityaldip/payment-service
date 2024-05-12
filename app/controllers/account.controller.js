const account = require('../models/account');

module.exports = {
  async createAccount(request, reply) {
    // Extract user ID from JWT token
    const userId = request.user.userId;

    if(!request.body.type) return reply.code(500).send({ error: "parameters type required!" });
    
    // Perform action, e.g., create account
    try {
      await account.createAccount(userId, request.body.type);
      return reply.code(201).send({ message: 'Account created successfully' });
    } catch (error) {
      console.error('Error creating account:', error);
      return reply.code(500).send({ error: error });
    }
  },

  async getUserAccounts(request, reply) {
    // Extract user ID from JWT token
    const userId = request.user.userId;

    // Perform action, e.g., fetch user accounts
    try {
      const accounts = await account.getUserAccounts(userId);
      return reply.code(200).send(accounts);
    } catch (error) {
      console.error('Error fetching user accounts:', error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  },
};
