const getIngredientsOpts = (fastify) => { return {
    schema: {
        query: {
            type: 'object',
            properties: {
                page: { type: 'integer', default: 1 },
                per_page: { type: 'integer', default: 10 },
                ingredient_id: { type: 'integer' },
                ingredient_name: { type: 'string' },
            }
        }
    }
}};

const getIngredientRoute = async(fastify, opts) => {
    fastify.get('/', getIngredientsOpts(fastify), async(request, response) => {
        const { ingredient_id, ingredient_name, page, per_page } = request.query;

        const ingredientQuery = fastify.mysql.format(
            `SELECT * FROM starving_college_students.ingredients
            LIMIT ?
            OFFSET ?`,
            [ per_page, (page - 1) * per_page ]
        );

        try {
            const [ ingredientRows, ] = await fastify.mysql.query(ingredientQuery);
            return response.send(ingredientRows);
        } catch (err) {
            fastify.log.error(err);
            return response.status(500).send({ error: 'Internal Server Error' });
        }
    });
};

export default getIngredientRoute;