import { ExpressContext } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
const { JWT_SECRET } = process.env;
export interface ContextValue {
	userId?: string;
}

export async function context({
	req,
	res,
}: ExpressContext): Promise<ContextValue> {
	const contextValue: ContextValue = {};

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
