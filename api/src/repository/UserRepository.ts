import DataLoader from 'dataloader';
import { Service } from 'typedi';
import { PostgresDataSource } from '../database/datasource';
import { Book } from '../entity/Book';
import { User } from '../entity/User';

@Service()
export class UserRepository {
	// These are specific to implementation with TypeORM:
	userRepository = PostgresDataSource.getRepository(User);
	bookRepository = PostgresDataSource.getRepository(Book);

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

	async findAll(): Promise<User[]> {
		return this.userRepository.createQueryBuilder('user').getMany();
	}

	async findOneByEmail(email: string): Promise<User | null> {
		return this.userRepository
			.createQueryBuilder('user')
			.where('user.email = :email', { email })
			.getOne();
	}

	async removeBookOwning(userId: string, bookId: string): Promise<Book | null> {
		const bookOwnedByUser = await this.bookRepository
			.createQueryBuilder('book')
			.innerJoin('book.usersOwnedBy', 'user')
			.where('book.id = :bookId', { bookId })
			.andWhere('user.id = :userId', { userId })
			.getOne();

		if (!bookOwnedByUser) {
			return null;
		}

		this.userRepository
			.createQueryBuilder('user')
			.relation(User, 'booksOwning')
			.of(userId)
			.remove(bookOwnedByUser);

		return bookOwnedByUser;
	}

	async addBookOwning(userId: string, bookId: string): Promise<Book | null> {
		const isBookOwnedByUser = !!(await this.bookRepository
			.createQueryBuilder('book')
			.innerJoin('book.usersOwnedBy', 'user')
			.where('book.id = :bookId', { bookId })
			.andWhere('user.id = :userId', { userId })
			.getOne());

		if (isBookOwnedByUser) {
			// Cannot buy book you already own:
			return null;
		}

		const bookExisting = await this.bookRepository
			.createQueryBuilder('book')
			.where('book.id = :bookId', { bookId })
			.getOne();

		this.userRepository
			.createQueryBuilder('user')
			.relation(User, 'booksOwning')
			.of(userId)
			.add(bookExisting);

		return bookExisting;
	}
}
