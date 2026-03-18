const getRecipeIdOpts = (fastify) => { return {
    schema: {
        params: {
            type: 'object',
            required: [ 'recipe_id' ],
            properties: {
                recipe_id: { type: 'integer' },
            }
        }
    }
}};

const getRecipeIdRoute = async(fastify, opts) => {
    fastify.get('/:recipe_id', getRecipeIdOpts(fastify), async(request, response) => {
        const { recipe_id } = request.params;

        const recipeIdQuery = fastify.myhsql.format(
            `SELECT * FROM starving_college_students.recipes
            WHERE recipe_id = ?`,
            [ recipe_id ]
        );

        try {
            const [ recipeIdRows, ] = await fastify.mysql.query(recipeIdQuery);
            return response.send(recipeIdRows);
        } catch (err) {
            fastify.log.error(err);
            return response.send('Internal Server Error');
        }
    });
};

export default getRecipeIdRoute;