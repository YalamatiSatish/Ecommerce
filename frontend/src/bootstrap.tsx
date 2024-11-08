import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createTheme /*  ThemeProvider  */ } from '@mui/material/styles';
import './index.scss';
//import { useSelector } from 'react-redux';
//import { RootState } from './store';

declare module '@mui/material/styles' {
	interface CommonColors {
		customColor1: string;
		customColor2: string;
		customColor3: string;
		customColor4: string;
		customColor5: string;
		customColor6: string;
		customColor7: string;
		customColor8: string;
		customColor9: string;
		customColor10: string;
		customColor11: string;
		customColor12: string;
	}
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

export const theme = createTheme({
	palette: {
		primary: {
			main: '#0076a8',
			light: '#EDF4f7',
			dark: '#1e1e1e',
			// light: will be calculated from palette.primary.main,
			// dark: will be calculated from palette.primary.main,
			// contrastText: will be calculated to contrast with palette.primary.main
		},
		secondary: {
			main: '#E0C2FF',
			light: '#F5EBFF',
			// dark: will be calculated from palette.secondary.main,
			contrastText: '#47008F',
		},
		common: {
			white: '#FFFFFF',
			black: '#454d56',
			customColor1: '#c2e2f0',
			customColor2: '#00354c',
			customColor3: '#fafafb',
			customColor4: '#E3E5E8',
			customColor5: '#00121A',
			customColor6: '#8CD4F2',
			customColor7: '#0092D1',
			customColor8: '#007DB3',
			customColor9: '#005980',
			customColor10: '#EFDBE2',
			customColor11: '#FFF0059',
			customColor12: '#F8FCFF',
		},
	},
	typography: {
		fontFamily: ['Titillium Web', 'Roboto Mono'].join(','),
	},
	components: {
		MuiContainer: {
			styleOverrides: {
				root: {
					maxWidth: '100%',
					paddingLeft: '40px !important',
					paddingRight: '40px !important',
				},
			},
		},
		/* MuiInputBase: {
			styleOverrides: {
				input: {
					WebkitTextSecurity: 'disc', // This will make sure it uses dots
					MozTextSecurity: 'disc', // Firefox specific (but might not be necessary)
					textSecurity: 'disc', // Standard (not widely supported yet)
				},
			},
		}, */
	},
});

/* export const lightTheme = createTheme({
	palette: {
		mode: 'light',
		background: {
			default: '#ffffff',
		},
		primary: {
			main: '#1976d2',
		},
		secondary: {
			main: '#9c27b0',
		},
	},
}); */

export const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		background: {
			default: '#121212',
		},
		primary: {
			main: '#90caf9',
		},
		secondary: {
			main: '#f48fb1',
		},
	},
});
//const { darkMode } = useSelector((state: RootState) => state.userLogin);
const ThemeWrapper = () => (
	<App />
	/* <ThemeProvider theme={theme} theme={darkMode ? darkTheme : theme} >
	</ThemeProvider>*/
);

root.render(
	process.env.NODE_ENV === 'development' ? (
		<ThemeWrapper />
	) : (
		<React.StrictMode>
			<ThemeWrapper />
		</React.StrictMode>
	),
);
