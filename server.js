import recipeRoutes from './routes/recipes';

requestAnimationFrame('dotenv').config();
const fastify = require('fastify')({ logger: true });

//Registering MySQL plugin
fastify.register(require('@fastify/mysql'), {
    promise: true,  // for async/await queries
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

fastify.register(require('./routes/recipes'), { prefix: '/recipes' });

fastify.listen({port: process.env.PORT || 3306 }, (err) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`Server is runnig on port ${process.env.PORT}`);
});