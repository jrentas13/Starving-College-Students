import 'dotenv/config';
import { fastify } from 'fastify';
import mysql from '@fastify/mysql';
import cors from '@fastify/cors';

import recipeRoutes from './routes/recipes/index.js';
import ingredientRoutes from './routes/ingredients/index.js';

// requestAnimationFrame('dotenv').config();
const server = fastify({ logger: true });

async function start() {
    try {
        //Registering MySQL
        await server.register(mysql, {
            promise: true,  // for async/await queries
            host: process.env.DB_HOST,
            port: process.env.DB_PORT || 8080,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
        });

        server.register(cors, {
            origin: "*"     // replace with website's URL when out of development
        });

        // Register Routes
        await server.register(recipeRoutes, { prefix: '/recipes' });
        await server.register(ingredientRoutes, { prefix: '/ingredients' });

        const port = process.env.PORT || 8080;
        await server.listen({ port: Number(port), host: '127.0.0.1' });

        console.log(`Server is running on port ${port}`);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
}

start();

// //Registering MySQL plugin
// server.register(import('@fastify/mysql'), {
//     promise: true,  // for async/await queries
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
// });

// // await server.register(recipeRoutes, { prefix: '/recipes' });

// server.listen({port: process.env.PORT || 3306 }, (err) => {
//     if (err) {
//         server.log.error(err);
//         process.exit(1);
//     }
//     console.log(`Server is running on port ${process.env.PORT}`);
// });