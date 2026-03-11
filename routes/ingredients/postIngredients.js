const postIngredientOpts = (fastify) => { return {
    schema: {
        body: {
            type: 'object',
            required: [ 'ingredient_name' ],
            properties: {
                ingredient_name: { type: 'string' },
            }
        }
    }
}};

const postIngredientRoute = async(fastify, opts) => {
    fastify.post('/', postIngredientOpts(fastify), async(request, response) => {
        const { ingredient_name } = request.body;

        const inserIngredientQuery = fastify.mysql.format(
            `INSERT INTO starving_college_students.ingredients
            ( ingredient_name )
            VALUES (?)`,
            [ ingredient_name ]
        );

        try {
            await fastify.mysql.query(inserIngredientQuery);
        } catch (err) {
            fastify.log.error(err);
            return response.status(500).send({ error: 'Internal Server Error' });
        }

        return response.status(201).send({ message: 'Ingredient created successfully' });
    });
}

export default postIngredientRoute;