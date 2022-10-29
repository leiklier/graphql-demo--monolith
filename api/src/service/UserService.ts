import { Service } from 'typedi';
import { User } from '../entity/User';
import { UserRepository } from '../repository/UserRepository';

@Service()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	findOneByEmail(email: string): Promise<User | null> {
		return this.userRepository.findOneByEmail(email);
	}
}
