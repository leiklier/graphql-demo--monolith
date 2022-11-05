import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useAllBooksQuery } from './graphql/generated';

function App() {
	const { data: allBooks } = useAllBooksQuery();
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>{allBooks?.allBooks.map((book) => book.priceUSD)}</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
