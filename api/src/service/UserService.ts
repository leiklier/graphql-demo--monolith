import { Service } from 'typedi';
import { TContext } from '../context';
import { User } from '../entity/User';
import { UserRepository } from '../repository/UserRepository';

@Service()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async getOneByEmail(context: TContext, email: string): Promise<User | null> {
		return this.userRepository.findOneByEmail(email);
	}

	async getSelf(context: TContext): Promise<User | null> {
		if (!context.authenticatedUser) {
			return null;
		}

		return this.userRepository.findOneById(context.authenticatedUser.id);
	}

	async getAll(context: TContext): Promise<User[]> {
		return this.userRepository.findAll();
	}
}
