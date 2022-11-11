import { Service } from 'typedi';
import { error } from '../error';
import { UserRepository } from '../repository/UserRepository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { TContext } from '../context';

const { JWT_SECRET } = process.env;

@Service()
export class AuthService {
	constructor(private readonly userRepository: UserRepository) {}

	async login(
		context: TContext,
		email: string,
		password: string,
	): Promise<string> {
		const existingUser = await this.userRepository.findOneByEmail(email);
		if (!existingUser) {
			throw error.INVALID_EMAIL;
		}

		const passwordIsCorrect = await bcrypt.compare(
			password,
			existingUser.hashedPassword,
		);
		if (!passwordIsCorrect) {
			throw error.INVALID_PASSWORD;
		}

		// 30 days expiry
		const expiresAt: number = Date.now() + 1000 * 60 * 60 * 24 * 30;
		const token = jwt.sign(
			{
				payload: {
					userId: existingUser.id,
				},
				exp: Math.floor(expiresAt / 1000),
			},
			JWT_SECRET!,
		);

		return token;
	}
}
