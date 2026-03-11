const deleteRecipeOpts = (fastify) => { return {
    schema: {
        params: {
            type: 'object',
            required: [ 'recipe_id' ],
            properties: {
                recipe_id: { type: 'integer' }
            }
        }
    }
}};

const deleteRecipeRoute = async(fastify, opts) => {
    fastify.delete('/:recipe_id', deleteRecipeOpts(fastify), async(request, response) => {
        const { recipe_id } = request.params;

        const deleteRecipeQuery = fastify.mysql.format(
            `DELETE FROM starving_college_students.recipes WHERE recipe_id = ?
            LIMIT 1`, [ recipe_id ]
        );

        try {
            await fastify.mysql.query(deleteRecipeQuery);
            return response.send();
        } catch (err) {
            fastify.log.error(err);
            return response.send('Internal Server Error');
        }
    });
};

export default deleteRecipeRoute;