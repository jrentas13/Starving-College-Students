const getInstructionsByRecipeOpts = (fastify) => { return {
    schema: {
        params: {
            type: 'object',
            required: [ 'recipe_id' ],
            properties: {
                recipe_id: { type: 'integer' },
            }
        },
        query: {
            type: 'object',
            properties: {
                step_number: { type: 'integer' },
            }
        }
    }
}};

const getInstructionsByRecipeRoute = async(fastify, opts) => {
    fastify.get('/:recipe_id', getInstructionsByRecipeOpts(fastify), async(request, response) => {
        const { recipe_id } = request.params;
        const { step_number } = request.query;

        const instructionQuery = fastify.mysql.format(
            `SELECT * FROM starving_college_students.instructions
            WHERE recipe_id = ?`,
            [ recipe_id ]
        );

        try {
            const [ instructionRows, ] = await fastify.mysql.query(instructionQuery);
            return response.send(instructionRows);
        } catch (err) {
            fastify.log.error(err);
            return response.status(500).send({ error: 'Internal Server Error' });
        }
    });
};

export default getInstructionsByRecipeRoute;