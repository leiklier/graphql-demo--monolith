import { faker } from '@faker-js/faker';
import { Factory, FactorizedAttrs } from '@jorgebodega/typeorm-factory';
import { Book } from '../../entity/Book';
import { PostgresDataSource } from '../datasource';

export class BookFactory extends Factory<Book> {
	protected entity = Book;
	// TODO: Find a way to move DataSource out
	protected dataSource = PostgresDataSource;
	protected attrs(): FactorizedAttrs<Book> {
		return {
			id: faker.datatype.uuid(),
			title: faker.commerce.productName(),
			author: faker.name.fullName(),
			priceUSD: parseInt(faker.commerce.price(10, 40, 0)),
		};
	}
}
