import fastify from 'fastify';

const port = process.env.PORT ? Number(process.env.PORT) : 1984;

const app = fastify();

app.get('/', async (req, res) => {
  return { message: 'Hello API' };
});

const start = async () => {
  try {
    await app.listen({ port });
    console.log(`[ ready ] http://localhost:${port}`);
  } catch (err) {
    // Errors are logged here
    process.exit(1);
  }
};

start();
