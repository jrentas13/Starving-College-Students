const getRecipesOpts =  (fastify) => { return {
    schema: {
        query: {
            type: 'object',
            properties: {
                page: { type: 'integer', default: 1 },
                per_page: { type: 'integer', default: 10},
                recipe_id: { type: 'integer' },
                name: { type: 'string' },
                description: { type: 'string'  },
                tags: {
                    anyOf: [
                        { type: 'array', items: { type: 'string' } },
                        { type: 'string' }
                    ]
                },
                price: { type: 'string', pattern: '^\\d+(\\.\\d{1,2})?$' },
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
            `SELECT * FROM starving_college_students.recipes
            LIMIT ?
            OFFSET ?`,
            [ per_page, (page -1) * per_page ]
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