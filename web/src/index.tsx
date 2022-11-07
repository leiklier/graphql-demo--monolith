import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';

const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
	cache: new InMemoryCache(),
	headers: {
		Authorization:
			'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXJJZCI6ImNhY2I4YzQ2LTlhNWItNGU3My1iNjQzLWI4Yjg0ZmUwMGJhOCJ9LCJleHAiOjE2NzAyNDY5OTIsImlhdCI6MTY2NzY1NDk5Mn0.4X1n_U_6D0gSkJXvgeQs5Yz-hTwZOPlgcLZBj8fLFHQ',
	},
});

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);
root.render(
	<React.StrictMode>
		<ChakraProvider>
			<ApolloProvider client={client}>
				<App />
			</ApolloProvider>
		</ChakraProvider>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
