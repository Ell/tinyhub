export function isValidName(name: string): boolean {
	const pattern = /[a-z0-9]+((\.|_|__|-+)[a-z0-9]+)*(\/[a-z0-9]+((\.|_|__|-+)[a-z0-9]+)*)*/;

	return pattern.test(name);
}

export function isValidReference(reference: string): boolean {
	const pattern = /[a-zA-Z0-9_][a-zA-Z0-9._-]{0,127}/;

	return pattern.test(reference);
}
