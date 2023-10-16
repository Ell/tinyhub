import { Hono } from 'hono';

import { Env } from './env';
import { v2 } from './v2';
import { logger } from './middleware';

const app = new Hono<{ Bindings: Env }>();

app.use("*", logger());

app.get('/', async (c) => {
	return c.json({ message: 'ok' });
});

app.get('/v1', async (c) => {
	return c.notFound();
});

app.get('/v2/', async (c) => {
	c.status(200);

	return c.body(null);
});

app.route('/v2', v2);

export default app;
