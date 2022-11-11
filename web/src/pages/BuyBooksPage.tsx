import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { BooksTable } from '../components/BooksTable';
import { NavBar } from '../components/NavBar';
import {
	useBooksInStoreQuery,
	useBuyOwnBookMutation,
	useMyBooksQuery,
	useSellOwnBookMutation,
	useUserInfoQuery,
} from '../graphql/generated';

export const BuyBooksPage: React.FC = () => {
	const { data: userInfoData } = useUserInfoQuery();
	const { data: myBooksData } = useMyBooksQuery();
	const { data: booksInStoreData } = useBooksInStoreQuery();
	const [sellOwnBook] = useSellOwnBookMutation({
		update(cache, result) {
			cache.evict({ fieldName: 'booksInStore' });
			const userId = result.data?.sellOwnBook.userSelling?.id;
			if (userId) {
				cache.evict({
					id: `User:${userId}`,
					fieldName: 'booksOwning',
				});
			}
		},
	});
	const [buyOwnBook] = useBuyOwnBookMutation({
		update(cache, result) {
			cache.evict({ fieldName: 'booksInStore' });
			const userId = result.data?.buyOwnBook.userBuying?.id;
			if (userId) {
				cache.evict({
					id: `User:${userId}`,
					fieldName: 'booksOwning',
				});
			}
		},
	});
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
								sellOwnBook({ variables: { sellOwnBookInput: { bookId } } }),
						}}
					/>
					<Heading as="h3">Books in store:</Heading>
					<BooksTable
						books={booksInStoreData?.booksInStore}
						actionButton={{
							text: 'Buy',
							color: 'green',
							onClick: (bookId: string) =>
								buyOwnBook({ variables: { buyOwnBookInput: { bookId } } }),
						}}
					/>
				</Flex>
			</Flex>
		</>
	);
};
