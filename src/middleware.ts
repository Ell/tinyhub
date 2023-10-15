import { Context, MiddlewareHandler, HonoRequest } from "hono";

export function trailingSlash(): MiddlewareHandler {
	return async function middleware(c, next) {
		const url = new URL(c.req.url)

		const pathname = url.pathname

		if (pathname.endsWith("/")) {
			return await next()
		}

		url.pathname = `${pathname}/`

		return c.redirect(url.toString())
	}
}

export function logger(): MiddlewareHandler {
	return async function middleware(c, next) {
		await next()

		const request = {
			method: c.req.method,
			path: c.req.path,
			headers: c.req.header(),
			raw: c.req.raw,
		}

		const response = {
			headers: Object.fromEntries(c.res.headers),
			raw: c.res,
		}

		const message = {
			url: c.req.url,
			status: c.res.status,
			request,
			response,
		}

		console.info(`${c.req.method.toUpperCase()} ${c.req.path} (${c.res.status})`, message);
	}
}
