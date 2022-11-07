import {
	Button,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';
import React from 'react';

interface Book {
	id: string;
	title: string;
	author: string;
	priceUSD: number;
}

interface BooksTableProps {
	books?: Book[];
	actionButton?: {
		text: string;
		color?: string;
		onClick: (bookId: string) => void;
	};
}

export const BooksTable: React.FC<BooksTableProps> = ({
	books,
	actionButton,
}) => {
	return (
		<TableContainer>
			<Table variant="simple">
				<Thead>
					<Tr>
						<Th>Title</Th>
						<Th>Author</Th>
						<Th isNumeric>Price</Th>
						<Th>Action</Th>
					</Tr>
				</Thead>
				<Tbody>
					{books?.map((book) => (
						<Tr key={book.id}>
							<Td>{book.title}</Td>
							<Td>{book.author}</Td>
							<Td isNumeric>${book.priceUSD}</Td>
							<Td>
								{actionButton ? (
									<Button
										colorScheme={actionButton.color}
										onClick={() => actionButton.onClick(book.id)}
									>
										{actionButton.text}
									</Button>
								) : (
									'None available'
								)}
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
};
