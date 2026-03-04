import getRecipeRoute from './getRecipes.js';
import postRecipeRoute from './postRecipes.js';
import putRecipeRoute from './putRecipes.js';

//PREFIX: /recipes
const recipeRoutes = async (fastify, opts) => {
    await fastify.register(getRecipeRoute);
    await fastify.register(postRecipeRoute);
    await fastify.register(putRecipeRoute);
};

export default recipeRoutes;