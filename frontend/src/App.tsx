import React, { Suspense } from 'react';
import { Box } from '@mui/material';
import HeaderNew from './components/HeaderNew';
import Footer from './components/Footer';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import RouteProvider from './routes';
import { ThemeProvider } from '@mui/material/styles';
import { theme, darkTheme } from './bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from './store';

function App() {
	const { darkMode } = useSelector((state: RootState) => state.userLogin);

	return (
		<Provider store={store}>
			<ThemeProvider theme={darkMode ? darkTheme : theme}>
				<BrowserRouter>
					<Box>
						<HeaderNew />
						<main>
							<Suspense fallback={<div> Loading ... </div>}></Suspense>
							<RouteProvider />
						</main>
						<Footer />
					</Box>
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	);
}

export default App;
