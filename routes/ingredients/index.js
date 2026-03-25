import getIngredientRoute from './getIngredients.js';
import postIngredientRoute from './postIngredients.js';
import putIngredientRoute from './putIngredients.js';
import deleteIngredientRoute from './deleteIngredient.js';

// PREFIX: /ingredients
const ingredientRoutes = async(fastify, opts) => {
    await fastify.register(getIngredientRoute);
    await fastify.register(postIngredientRoute);
    await fastify.register(putIngredientRoute);
    await fastify.register(deleteIngredientRoute);
};

export default ingredientRoutes;