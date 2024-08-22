import React, { Suspense } from 'react';
import { Box, } from '@mui/material';
import HeaderResponsive from './components/HeaderResponsive';
import Footer from './components/Footer';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import RouteProvider from './routes';

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Box>
					<HeaderResponsive />
					<main
					>
						<Suspense fallback={<div> Loading ... </div>}></Suspense>
						<RouteProvider />
					</main>
					<Footer />
				</Box>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
