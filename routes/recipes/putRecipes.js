const putRecipeOpts = (fastify) => { return {
    schema: {
        params: {
            type: 'object',
            required: [ 'recipe_id' ],
            properties: {
                recipe_id: { type: 'integer' }
            }
        },
        body: {
            type: 'object',
            required: [ 'name' ],
            properties: {
                name: { type: 'string' },
                description: { type: 'string' },
                ingredients: { type: 'string' },
                instructions: { type: 'string' },
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

const putRecipeRoute = async( fastify, opts) => { 
    fastify.put('/:idRecipe', putRecipeOpts(fastify), async (request, response) => {
        const { recipe_id } = request.params;
        const { name, description, ingredients, instructions, tags, price, cook_time, servings } = request.body;

        const recipeQuery = fastify.mysql.format(
            `SELECT * FROM starving_college_students.recipes WHERE idRecipe = ?`,
            [ recipe_id ]
        );

        const [ recipeRows, ] = await fastify.mysql.query(recipeQuery);

        if (recipeRows.length !== 1) {
            if (recipeRows.length === 0) return response.status(404).send( { error: 'Recipe not found' });
            if (recipeRows.length > 1) return response.status(500).send();
        }

        const { name: currName } = recipeRows[0];
        const { description: currDes } = recipeRows[0];
        const { ingredients: currIng } = recipeRows[0];
        const { instructions: currInst } = recipeRows[0];
        const { price: currPrice } = recipeRows[0];
        const { cook_time: currCook } = recipeRows[0];
        const { servings: currServ } = recipeRows[0];
        
        const updateName = name ? name : currName;
        const updateDes = description ? description: currDes;
        const updateIng = ingredients ? ingredients: currIng;
        const updateInst = instructions ? instructions: currInst;
        const updatePrice = price ? price: currPrice;
        const updateCook = cook_time ? cook_time: currCook;
        const updateServ = servings ? servings: currServ;

        const updateRecipeQuery = fastify.mysql.format(
            `UPDATE starving_college_students.recipe SET name = ?, description = ?, ingredients = ?, instructions = ?,
                price = ?, cook_time = ?, servings = ?
            WHERE recipe_id = ?`,
            [ updateName, updateDes, updateIng, updateInst, updatePrice, updateCook, updateServ, recipe_id ]
        );

        try {
            await fastify.mysql.query(updateRecipeQuery);
        } catch (err) {
            fastify.log.error(err);
            return response.status(500).send({ error : `Unable to update recipe ${recipe_id}.` });
        }

        return response.status(200).send({ message: 'Succesfully updated recipe.' });

    });
};

export default putRecipeRoute;