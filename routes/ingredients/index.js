import getIngredientRoute from './getIngredients';
import postIngredientRoute from './postIngredients';
import putIngredientRoute from './putIngredients';

// PREFIX: /ingredients
const ingredientRoutes = async(fastify, opts) => {
    await fastify.register(getIngredientRoute);
    await fastify.register(postIngredientRoute);
    await fastify.register(putIngredientRoute);
};

export default ingredientRoutes;