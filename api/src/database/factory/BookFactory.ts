import { Factory, Faker } from '@mikro-orm/seeder';
import { Book } from '../../entity/Book';

export class BookFactory extends Factory<Book> {
	model = Book;

	definition(faker: Faker): Partial<Book> {
		return {
			id: faker.datatype.uuid(),
			title: faker.commerce.productName(),
			author: faker.name.fullName(),
			priceUSD: parseInt(faker.commerce.price(10, 40, 0)),
		};
	}
}
