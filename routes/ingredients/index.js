import getIngredientRoute from './getIngredients';
import postIngredientRoute from './postIngredients';
import putIngredientRoute from './putIngredients';
import deleteIngredientRoute from './deleteIngredient';

// PREFIX: /ingredients
const ingredientRoutes = async(fastify, opts) => {
    await fastify.register(getIngredientRoute);
    await fastify.register(postIngredientRoute);
    await fastify.register(putIngredientRoute);
    await fastify.register(deleteIngredientRoute);
};

export default ingredientRoutes;