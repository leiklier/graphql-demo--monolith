import { Service } from 'typedi';
import { User } from '../entity/User';
import { UserRepository } from '../repository/UserRepository';

@Service()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async getOneByEmail(email: string): Promise<User | null> {
		return this.userRepository.findOneByEmail(email);
	}

	async getSelfById(authenticatedUserId: string | null): Promise<User | null> {
		if (!authenticatedUserId) {
			return null;
		}

		return this.userRepository.findOneById(authenticatedUserId);
	}
}
