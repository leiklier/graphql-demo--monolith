import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { BooksTable } from '../components/BooksTable';
import { NavBar } from '../components/NavBar';
import {
	useBooksInStoreQuery,
	useBuyBookMutation,
	useMyBooksQuery,
	useSellBookMutation,
	useUserInfoQuery,
} from '../graphql/generated';

export const BuyBooksPage: React.FC = () => {
	const { data: userInfoData } = useUserInfoQuery();
	const { data: myBooksData } = useMyBooksQuery();
	const { data: booksInStoreData } = useBooksInStoreQuery();
	const [sellBook] = useSellBookMutation();
	const [buyBook] = useBuyBookMutation();
	return (
		<>
			<NavBar />
			<Flex direction="column" alignItems="center">
				<Flex direction="column" alignItems="flex-start" gap="2rem">
					<Heading as="h2">
						Welcome back, {userInfoData?.me?.firstName}{' '}
						{userInfoData?.me?.lastName}!
					</Heading>
					<Heading as="h3">Books that you own:</Heading>
					<BooksTable
						books={myBooksData?.me?.booksOwning}
						actionButton={{
							text: 'Sell',
							color: 'red',
							onClick: (bookId: string) =>
								sellBook({ variables: { sellBookInput: { bookId } } }),
						}}
					/>
					<Heading as="h3">Books in store:</Heading>
					<BooksTable
						books={booksInStoreData?.booksInStore}
						actionButton={{
							text: 'Buy',
							color: 'green',
							onClick: (bookId: string) =>
								buyBook({ variables: { buyBookInput: { bookId } } }),
						}}
					/>
				</Flex>
			</Flex>
		</>
	);
};
