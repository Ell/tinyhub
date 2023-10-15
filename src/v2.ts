import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';

import { ErrorCode, RegistryError } from './error';
import { Env } from './env';
import { createSessionId } from './session';
import { isValidName, isValidReference } from './validators';

export const v2 = new Hono<{ Bindings: Env }>();

v2.onError((err, c) => {
	if (c.env.NODE_ENV === 'production') {
		const errorOutput = JSON.stringify(err, Object.getOwnPropertyNames(err));

		console.error(errorOutput)
	} else {
		console.log(err);
	}

	if (err instanceof RegistryError) {
		const body = {
			errors: [
				{
					code: err.code,
					message: err.message,
				},
			],
		};

		const response = new Response(JSON.stringify(body), {
			status: err.statusCode,
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return response;
	}

	if (err instanceof HTTPException) {
		return err.getResponse();
	}

	const body = {
		errors: [
			{
				code: ErrorCode.Unknown,
				message: err.message,
			},
		],
	};

	const response = new Response(JSON.stringify(body), {
		status: 500,
		headers: {
			'Content-Type': 'application/json',
		},
	});

	return response;
});

// end-1
v2.get('/', async (c) => {
	console.log("end-1");

	c.status(200);

	return c.body(null);
});

// end-2
v2.get('/:name/blobs/:digest/', async (c) => {
	const { name, digest } = c.req.param();

	if (c.req.method === 'HEAD') {
		/*
		* A HEAD request to an existing blob or manifest URL MUST return 200 OK. A
		* successful response SHOULD contain the digest of the uploaded blob in the
		* header Docker-Content-Digest.
		*
		*	If the blob or manifest is not found in the registry, the response code
		* MUST be 404 Not Found.
		*/
		c.status(404);
	}
});

// end-3
v2.get('/:name/manifests/:reference/', async (c) => {
	const { name, reference } = c.req.param();

	if (c.req.method === 'HEAD') {
		/*
		* A HEAD request to an existing blob or manifest URL MUST return 200 OK. A
		* successful response SHOULD contain the digest of the uploaded blob in the
		* header Docker-Content-Digest.
		*
		*	If the blob or manifest is not found in the registry, the response code
		* MUST be 404 Not Found.
		*/
		c.status(404);
	}

	if (!isValidName(name)) {
		throw new RegistryError(ErrorCode.NameInvalid, 404);
	}

	if (!isValidReference(reference)) {
		throw new RegistryError(ErrorCode.NameInvalid, 404, 'invalid reference');
	}

	c.status(200);
});

// end-4a, end-4b
v2.post('/:name/blobs/uploads/', async (c) => {
	const { name } = c.req.param();

	if (!isValidName(name)) {
		throw new RegistryError(ErrorCode.NameInvalid, 404);
	}

	const { digest } = c.req.query();

	if (digest) {}

	const sessionId = createSessionId();

	c.status(202);
	c.res.headers.set('Location', `/v2/${name}/blobs/uploads/${sessionId}/`);

	return c.body(null);
});

// end-5
v2.patch('/:name/blobs/uploads/:reference/', async (c) => {
	const { name, reference } = c.req.param();

	if (!isValidName(name)) {
		throw new RegistryError(ErrorCode.NameInvalid, 400);
	}

	if (!isValidReference(reference)) {
		throw new RegistryError(ErrorCode.NameInvalid, 400, 'invalid reference');
	}

	c.status(202);

	return c.body(null);
});

// end-6
v2.put('/:name/blobs/uploads/:reference/', async (c) => {
	const { name, reference } = c.req.param();

	if (!isValidName(name)) {
		throw new RegistryError(ErrorCode.NameInvalid, 400);
	}

	if (!isValidReference(reference)) {
		throw new RegistryError(ErrorCode.NameInvalid, 400, 'invalid reference');
	}

	const { digest } = c.req.query();

	if (!digest) {
		throw new RegistryError(ErrorCode.DigestInvalid, 400);
	}

	return c.body(null);
});

// end-7
v2.put('/:name/manifests/:reference/', async (c) => {
	const { name, reference } = c.req.param();
});

// end-8a, end-8b
v2.get('/:name/tags/list/', async (c) => {
	const { name } = c.req.param();
});

// end-9
v2.delete('/:name/manifests/:reference/', async (c) => {
	const { name, reference } = c.req.param();
});

// end-10
v2.delete('/:name/blobs/:digest/', async (c) => {
	const { name, digest } = c.req.param();
});

// end-11
v2.post('/:name/blobs/uploads/', async (c) => {
	const { name } = c.req.param();
});

// end-12a, end-12b
v2.get('/:name/referrers/:digest/', async (c) => {
	const { name, digest } = c.req.param();
});

// end-13
v2.get('/:name/blobs/uploads/:reference/', async (c) => {
	const { name, reference } = c.req.param();
});
