const putIngredientsOpts = (fastify) => { return {
    schema: {
        params: {
            type: 'object',
            required: [ 'ingredient_id' ],
            properties: {
                ingredient_id:  { type: 'integer' }
            }
        },
        body: {
            type: 'object',
            required: [ 'ingredient_name' ],
            properties: {
                ingredient_name: { type: 'string' }
            }
        }
    }
}};

const putIngredientRoute = async(fastify, opts) => {
    fastify.put('/', putIngredientsOpts(fastify), async(request, response) => {
        const { ingredient_id } = request.params;
        const { ingredient_name } = request.body;

        const ingredientQuery = fastify.mysql.format(
            `SELECT * FROM starving_college_students.ingredients
            WHERE ingredient_id = ?`,
            [ ingredient_id ]
        );

        const [ ingredientRows, ] = fastify.mysql.query(ingredientQuery);

        if(ingredientRows.length !== 1) {
            if (ingredientRows.length === 0) return response.status(404).send( { error: 'Ingredient not found' } );
            if (ingredientRows.length > 1) return response.status(500).send();

        }

        const { ingredient_name: currName } = ingredientRows[0];

        const updateName = ingredient_name ? ingredient_name : currName;

        const updateIngredientQuery = fastify.mysql.format(
            `UPDATE starving_college_students.ingredients SET ingredient_name = ?
            WHERE ingredient_id = ?`,
            [ updateName, ingredient_id ]
        );

        try {
            await fastify.mysql.query(updateIngredientQuery);
        } catch (err) {
            fastify.log.error(err);
            return response.status(500).send({ error: `Unable to update ingredient ${ingredient_id}.` });
        }

        return response.status(200).send({ message: 'Succesfully updated ingredient.' });
    });
};

export default putIngredientRoute;