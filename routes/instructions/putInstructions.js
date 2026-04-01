const putInsructionsOpts = (fastify) => { return {
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
const putInstructionsRoute = async(fastify, opts) => {
    fastify.put('/:recipe_id', putInsructionsOpts(fastify), async(request, response) => {
        const { recipe_id } = request.params;
        const { step_number, instruction_text } = request.body;

        const instructionQuery = fastify.mysql.format(
            `SELECT * FROM starving_college_students.instructions
            WHERE recipe_id = ?`,
            [ recipe_id ]
        );

        const [ instructionRows, ] = await fastify.mysql.query(instructionQuery);

        if (instructionRows.length !== 1) {
            if (instructionRows.length === 0) return response.status(404).send({ error: 'Could not find recipe you wish to update.' });
            if (instructionRows.length > 1) return response.status(500).send();
        }
        
        // const { step_number: currStep } = instructionRows[0];
        // const { instruction_text: currText } = instructionRows[0];

        // const updateStep = step_number ? step_number : currStep;
        // const updateText = instruction_text ? instruction_text : currText;
        
        let instructions;
        request.body.instructions.forEach(instruction => {
            if (instruction.step_number) {
                const { step_number, instruction_text } = instruction;
                instructions.push({ step_number, instruction_text }); 
            }
        });

        if (instructions.length > 0) {
            const updateInstrucionsQuery = fastify.mysql.format(
                `UPDATE starving_college_students.instructions
                SET step_number = ?, instruction_text = ?
                WHERE recipe_id = ?`,
                [ instructions.map(instruction => [ instruction.step_number]),
                instructions.map(instruction => [ instruction.instruction_text]),
                recipe_id ]
            );

            try {
                await fastify.mysql.query(updateInstrucionsQuery);
            } catch (err) {
                fastify.log.error(err);
                return response.status(500).send({ error:  `There was an error updating the instructions for recipe ${recipe_id}.`});
            }
        }

        return response.send();
    });
};

export default putInstructionsRoute;