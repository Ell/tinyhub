import { Env } from './env';

export type Session = {
	namespace: string;
};

export function createSessionId(): string {
	return crypto.randomUUID().toString();
}

export function getOrCreateSession(env: Env, sessionId: string): Promise<Session | null> {
	return env.TINYHUB_KV.get<Session>(sessionId, { type: 'json' });
}
