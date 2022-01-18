import { getUserDetails, uniqueName } from '$lib/common';
import * as db from '$lib/database';
import { PrismaErrorHandler } from '$lib/database';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async (request) => {
	return {
		body: {
			name: uniqueName()
		}
	};
}
export const post: RequestHandler<Locals, FormData> = async (request) => {
	const { userId, status, body } = await getUserDetails(request);
	if (status === 401) return { status, body }

	const name = request.body.get('name') || undefined
	try {
		return await db.newTeam({ name, userId })
	} catch (err) {
		return err
	}
}


