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
                order: { type: 'string' }
            }
        }
    }
}};

const getRecipeRoute = async( fastify, opts) => {
    fastify.get('/', getRecipesOpts(fastify), async (request, response) => {
        const { page, per_page, name, tags, order } = request.query;

        let baseQuery = `SELECT * FROM starving_college_students.recipes`;
        let conditions = [];
        let values = [];

        if (name) {
            conditions.push(`name Like ?`);
            values.push(`%${name}%`);
        }

        let tagArray = tags;
        if(typeof tags === "string") {
            tagArray = tags.split(",");
        }

        if (tagArray && tagArray.length > 0) {
            conditions.push(`tags IN (?)`);
            values.push(tagArray);
        }

        if (conditions.length > 0) {
            baseQuery += " WHERE " + conditions.join(" AND ");
        }

        const allowedOrderFields = ["created_at", "name", "cook_time"];
        if (allowedOrderFields.includes(order)) {
            baseQuery += ` ORDER BY ${order}`;
        }

        baseQuery += ` LIMIT ? OFFSET ?`;
        values.push(per_page, (page - 1) * per_page);

        const recipeQuery = fastify.mysql.format(baseQuery, values);

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