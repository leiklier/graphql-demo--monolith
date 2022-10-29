import { Service } from 'typedi';
import { PostgresDataSource } from '../database/datasource';
import { User } from '../entity/User';

@Service()
export class UserRepository {
	userRepository = PostgresDataSource.getRepository(User);

	findManyById(ids: string[]): Promise<User[]> {
		return this.userRepository
			.createQueryBuilder('user')
			.where('user.id IN(:...ids', { ids })
			.getMany();
	}

	findOneByEmail(email: string): Promise<User | null> {
		return this.userRepository
			.createQueryBuilder('user')
			.where('user.email = :email', { email })
			.getOne();
	}
}
