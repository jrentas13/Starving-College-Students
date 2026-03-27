export default async function authRoutes(fastify, options) {
    fastify.post('/login', async (request, reply) => {
        const { username, password } = request.body;

        // Use the mysql connection you already registered
        const connection = await fastify.mysql.getConnection();
        
        // Simple query: find a user where both name and password match
        const [rows] = await connection.query(
            'SELECT * FROM users WHERE username = ? AND password = ?',
            [username, password]
        );
        connection.release();

        if (rows.length > 0) {
            return { status: 'success', user: rows[0].username };
        } else {
            return reply.code(401).send({ message: 'User not found or wrong password' });
        }
    });
}