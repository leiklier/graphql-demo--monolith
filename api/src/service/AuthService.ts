import { Service } from 'typedi';
import { error } from '../error';
import { UserRepository } from '../repository/UserRepository';
import bcrypt from 'bcryptjs';
import { TContext } from '../context';
import { encodeToken } from '../util/token';

const { JWT_SECRET } = process.env;

@Service()
export class AuthService {
	constructor(private readonly userRepository: UserRepository) {}

	async login(
		context: TContext,
		email: string,
		password: string,
	): Promise<string | null> {
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
		const token = encodeToken(existingUser, 30);
		return token;
	}
}
