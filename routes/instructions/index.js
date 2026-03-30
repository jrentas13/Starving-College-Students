import getInstructionsByRecipeRoute from './getInstructions.js';
import postInstructionsRoute from './postInstructions.js';
import putInstructionsRoute from './putInstructions.js';

// PREFIX: /instructions
const instructionRoutes = async (fastify, opts) => {
    await fastify.register(getInstructionsByRecipeRoute);
    await fastify.register(postInstructionsRoute);
    await fastify.register(putInstructionsRoute);
};

export default instructionRoutes;