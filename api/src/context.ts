import { ExpressContext } from 'apollo-server-express';
import { v4 as uuidv4 } from 'uuid';

import jwt from 'jsonwebtoken';
const { JWT_SECRET } = process.env;
export interface TContext {
	requestId: string;
	userId?: string;
}

export async function context({ req, res }: ExpressContext): Promise<TContext> {
	const contextValue: TContext = { requestId: uuidv4() };

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
		const decryptedToken = jwt.verify(token, JWT_SECRET!) as jwt.JwtPayload;
		const tokenPayload = decryptedToken.payload;
		const { userId } = tokenPayload;
		contextValue.userId = userId;
	}

	return contextValue;
}
