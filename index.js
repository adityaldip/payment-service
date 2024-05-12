const fastify = require('fastify')();
const routes = require('./config/route');

fastify.register(require('@fastify/cors')); // Use @fastify/cors instead of fastify-cors
fastify.register(require('@fastify/jwt'), { secret: 'your-secret-key' }); // Use @fastify/jwt instead of fastify-jwt

fastify.register(routes);

fastify.listen(3000, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Server listening on http://localhost:3000');
});
