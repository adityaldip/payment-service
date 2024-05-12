const AuthController = require('../app/controllers/auth.controller');
const AccountController = require('../app/controllers/account.controller');
const TransactionController = require('../app/controllers/transaction.controller');

const { authenticateToken } = require('../app/middleware/authMiddleware');

async function routes(fastify, options) {
  fastify.post('/auth/register', AuthController.register);
  fastify.post('/auth/login', AuthController.login);

  fastify.post('/create-account', { preHandler: authenticateToken }, AccountController.createAccount);
  fastify.get('/accounts', { preHandler: authenticateToken }, AccountController.getUserAccounts);

  fastify.post('/send', { preHandler: authenticateToken }, TransactionController.sendTransaction);
  fastify.post('/withdraw', { preHandler: authenticateToken }, TransactionController.withdrawTransaction);
}

module.exports = routes;
