import jwt from 'jsonwebtoken';
import { AuthRole } from '../interface/auth';

const { JWT_SECRET } = process.env;

export interface AuthUser {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	authRoles: AuthRole[];
}

export interface TokenContent {
	authenticatedUser: AuthUser;
}

export function encodeToken(user: AuthUser, daysValid: number): string {
	const expiresAt: number = daysValid * 1000 * 60 * 60 * 24 + Date.now();
	const token = jwt.sign(
		{
			payload: {
				authenticatedUser: user,
			},
			exp: Math.floor(expiresAt / 1000),
		},
		JWT_SECRET!,
	);

	return token;
}

export function decodeToken(token: string): TokenContent {
	const decryptedToken = jwt.verify(token, JWT_SECRET!) as jwt.JwtPayload;
	const tokenContent: TokenContent = decryptedToken.payload;
	return tokenContent;
}
