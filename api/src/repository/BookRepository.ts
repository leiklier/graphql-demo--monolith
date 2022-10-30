import DataLoader from 'dataloader';
import { Service } from 'typedi';
import { PostgresDataSource } from '../database/datasource';
import { Book } from '../entity/Book';

@Service()
export class BookRepository {
	bookRepository = PostgresDataSource.getRepository(Book);

	// DataLoader is required to avoid N+1 issue
	// with GraphQL resolvers. It is destroyed after
	// each request
	bookLoader = new DataLoader((bookIds: readonly string[]) => {
		return this.bookRepository
			.createQueryBuilder('book')
			.where('book.id IN(:...bookIds)', { bookIds })
			.getMany();
	});

	async findOneById(id: string): Promise<Book | null> {
		return (await this.bookLoader.load(id)) as Book;
	}

	async findManyById(ids: string[]): Promise<Book[]> {
		return (await this.bookLoader.loadMany(ids)) as Book[];
	}

	async findAll(): Promise<Book[]> {
		return this.bookRepository.find();
	}
}
