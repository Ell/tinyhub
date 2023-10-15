export type Env = {
	TINYHUB_KV: KVNamespace;
	TINYHUB_R2: R2Bucket;
	TINYHUB_DB: D1Database;

	NODE_ENV: "production" | "development";
};
