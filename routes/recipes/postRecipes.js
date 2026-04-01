const postRecipeOpts = (fastify) => { return {
    schema: {
        body: {
            type: 'object',
            required: [ 'name' ],
            properties: {
                name: { type: 'string' },
                description: { type: 'string' },
                tags: {
                    anyOf: [
                        { type: 'array', items: { type: 'string' } },
                        { type: 'string' }
                    ]
                },
                price: { type: 'string', pattern: '^\\d+(\\.\\d{1,2})?$' },
                prep_time: { type: 'integer' },
                cook_time: { type: 'integer' },
                servings: { type: 'integer' }
            }
        }
    }
}};

const postRecipeRoute = async( fastify, opts) => {
    fastify.post('/', postRecipeOpts(fastify), async (request, response) => {
        const { name, description, tags, price, prep_time, cook_time, servings } = request.body;

        const insertRecipeQuery = fastify.mysql.format(
            `INSERT INTO starving_college_students.recipes 
            ( name, description, tags, price, prep_time, cook_time, servings ) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [ name, description, JSON.stringify(tags), price, prep_time, cook_time, servings ]
        );

        try {
            await fastify.mysql.query(insertRecipeQuery);
        } catch (err) {
            fastify.log.error(err);
            return response.status(500).send({ error: 'Internal Server Error' });
        }

        return response.status(201).send({ message: 'Recipe created successfully' });
        });
};

export default postRecipeRoute;