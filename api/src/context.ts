import { ExpressContext } from 'apollo-server-express';
import { v4 as uuidv4 } from 'uuid';

import jwt from 'jsonwebtoken';
import { AuthUser, decodeToken } from './util/token';
const { JWT_SECRET } = process.env;
export interface TContext {
	requestId: string;
	authenticatedUser: AuthUser | null;
}

export async function context({ req, res }: ExpressContext): Promise<TContext> {
	const contextValue: TContext = {
		requestId: uuidv4(),
		authenticatedUser: null,
	};

	let token: string | undefined;
	// HTTP authentication:
	try {
		// Format of header Authorization: Bearer <token>
		const authHeader = req.headers.authorization!;
		token = authHeader.split(' ')[1];
	} catch (err) {
		// authHeader is empty
	}
	// WebSocket authentication:
	// (TODO!)

	if (token) {
		const tokenContent = decodeToken(token);
		const { authenticatedUser } = tokenContent;
		contextValue.authenticatedUser = authenticatedUser;
	}

	return contextValue;
}
