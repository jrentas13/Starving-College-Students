import getRecipeRoute from './getRecipes.js';
import getRecipeIdRoute from './getRecipeId.js';
import postRecipeRoute from './postRecipes.js';
import putRecipeRoute from './putRecipes.js';
import deleteRecipeRoute from './deleteRecipe.js';

//PREFIX: /recipes
const recipeRoutes = async (fastify, opts) => {
    await fastify.register(getRecipeRoute);
    await fastify.register(getRecipeIdRoute);
    await fastify.register(postRecipeRoute);
    await fastify.register(putRecipeRoute);
    await fastify.register(deleteRecipeRoute);
};

export default recipeRoutes;