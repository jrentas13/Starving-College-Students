const postInstructionsOpts = (fastify) => { return {
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
            required: [ 'instructions' ],
            properties: {
                instructions: {
                    type: 'array',
                    items: {
                        type: 'object',
                        required: [ 'step_number', 'instruction_text' ],
                        properties: {
                            step_number: { type: 'integer' },
                            instruction_text: { type: 'string' }
                        }
                    }
                }
            }
        }
    }
}};

// TODO: Potentially change both instruction and ingredients route to be just recipe routes
const postInstructionsRoute = async(fastify, opts) => {
    fastify.post('/:recipe_id', postInstructionsOpts(fastify), async(request, response) => {
        const { recipe_id } = request.params;

        let instructions;
        request.body.instructions.forEach(instruction => {
            if (instruction.step_number) {
                const { step_number, instruction_text } = instruction;
                instructions.push({ step_number, instruction_text });
            }
        });

        if (instructions.length > 0) {
            const insertInstructionsQuery = fastify.mysql.format(
                `INSERT INTO starving_college_students.instructions (step_number, instruction_text)
                VALUES ?
                ON DUPLICATE KEY UPDATE instruction_text = VALUES(instruction_text)`,
                [instructions.map(instruction => [ instruction.step_number, instruction.instruction_text]) ]
            );

            try {
                await fastify.mysql.query(insertInstructionsQuery);
            } catch (err) {
                fastify.log.error(err);
                return response.status(500).send({ error: 'There was an error in adding instructions to the recipe.'});
            }
        }

        return response.send();
    });
};

export default postInstructionsRoute;