const getRecipesOpts =  (fastify) => { return {
    schema: {
        query: {
            type: 'object',
            properties: {
                page: { type: 'integer', default: 1 },
                per_page: { type: 'integer', default: 10},
                idRecipe: { type: 'integer' },
                name: { type: 'string' },
                description: { type: 'string'  },
                tags: {
                    anyOf: [
                        { type: 'array', items: { type: 'string' } },
                        { type: 'string' }
                    ]
                },
                price: { type: 'decimal' },
                cook_time: { type: 'integer' },
                servings: {type: 'integer' },
            }
        }
    }
}};

const getRecipeRoute = async( fastify, opts) => {
    fastify.get('/', getRecipesOpts(fastify), async (request, response) => {
        const { idRecipe, page, per_page  } = request.query;

        const recipeQuery = fastify.mysql.format(
            `SELECT * FROM sys.recipes
            WHERE idRecipe = ?
            LIMIT ?
            OFFSET ?`,
            [ idRecipe, per_page, (page -1) * per_page ]
        );

        let recipeRows; 

        try {
            [ recipeRows,  ] = await fastify.mysql.query(recipeQuery);
        } catch (err) {
            fastify.log.error(err);
            return response.send()
        }

        return response.send(recipeRows);
    });
};

export default getRecipeRoute;