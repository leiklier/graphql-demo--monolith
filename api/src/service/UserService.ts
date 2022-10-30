import { Service } from 'typedi';
import { User } from '../entity/User';
import { UserRepository } from '../repository/UserRepository';

@Service()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async getOneByEmail(email: string): Promise<User | null> {
		return this.userRepository.findOneByEmail(email);
	}

	async getSelfById(ownUserId?: string): Promise<User | null> {
		if (!ownUserId) {
			return null;
		}

		return this.userRepository.findOneById(ownUserId);
	}
}
