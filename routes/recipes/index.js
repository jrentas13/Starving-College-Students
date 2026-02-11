import getRecipeRoute from './getRecipes';
import postRecipeRoute from './postRecipes';
import putRecipeRoute from './putRecipes';

//PREFIX: /recipes
const recipeRoutes = async (fastify, opts) => {
    await fastify.register(getRecipeRoute);
    await fastify.register(postRecipeRoute);
    await fastify.register(putRecipeRoute);
};

export default recipeRoutes;