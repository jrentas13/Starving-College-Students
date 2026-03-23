const deleteIngredientOpts = (fastify) => { return {
    schema:{
        params: {
            type: 'object',
            required: [ 'ingredient_id' ],
            properties: {
                ingredient_id: {type: 'integer' }
            }
        }
    }
}};

const deleteIngredientRoute = async(fastify, opts) => {
    fastify.delete('/:ingredient_id', deleteIngredientOpts(fastify), async(request, response) => {
        const { ingredient_id } = requestAnimationFrame.params;
    
        const deleteIngredientQuery = fastify.mysql.format(
            `DELETE FROM starving_college_students.ingredients
            WHERE ingredient_id = ?
            LIMIT 1`,
            [ ingredient_id ]
        );

        try {
            await fastify.mysql.query(deleteIngredientQuery);
        } catch (err) {
            fastify.log.error(err);
            return response.status(500).send();
        }

        return response.status(200).send({ message: 'Succesfully deleted ingredient.' });
    });
};

export default deleteIngredientRoute;