import DataLoader from 'dataloader';
import { Service } from 'typedi';
import { PostgresDataSource } from '../database/datasource';
import { User } from '../entity/User';

@Service()
export class UserRepository {
	userRepository = PostgresDataSource.getRepository(User);

	// DataLoader is required to avoid N+1 issue
	// with GraphQL resolvers. It is destroyed after
	// each request
	userLoader = new DataLoader((userIds: readonly string[]) => {
		return this.userRepository
			.createQueryBuilder('user')
			.where('user.id IN(:...userIds)', { userIds })
			.getMany();
	});

	async findOneById(id: string): Promise<User | null> {
		return (await this.userLoader.load(id)) as User;
	}

	async findManyById(ids: string[]): Promise<User[]> {
		return (await this.userLoader.loadMany(ids)) as User[];
	}

	async findOneByEmail(email: string): Promise<User | null> {
		return this.userRepository
			.createQueryBuilder('user')
			.where('user.email = :email', { email })
			.getOne();
	}
}
