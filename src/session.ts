import { Env } from './env';

export type Session = {};

export function createSessionId(): string {
	return crypto.randomUUID().toString();
}

export async function getOrCreateSession(env: Env, sessionId: string): Promise<Session | null> {
	const session = env.TINYHUB_KV.get<Session>(sessionId, { type: 'json' });

	if (!session) {
		env.TINYHUB_KV.put(sessionId, "{}")

		return {};
	}

	return session;
}

export async function saveSession(env: Env, sessionId: string, session: Session) {
	return env.TINYHUB_KV.put(sessionId, JSON.stringify(session));
}
