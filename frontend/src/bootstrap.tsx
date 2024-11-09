import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createTheme /*  ThemeProvider  */ } from '@mui/material/styles';
import './index.scss';
//import { useSelector } from 'react-redux';
//import { RootState } from './store';
import { Provider } from 'react-redux';
import { store } from './store';

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
	/* palette: {
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
	}, */
	palette: {
		mode: 'light',
		primary: {
			main: '#000000', // Black as the primary accent
			light: '#4d4d4d', // Lighter black/gray for hover states
			dark: '#1a1a1a', // Dark black for active states
			contrastText: '#ffffff', // White text on primary backgrounds
		},
		secondary: {
			main: '#333333', // Dark gray as a secondary color
			light: '#666666', // Medium gray for secondary hover states
			dark: '#1a1a1a', // Darker gray for secondary active states
			contrastText: '#ffffff', // White text on secondary backgrounds
		},
		background: {
			default: '#f5f5f5', // Light gray for the main background
			paper: '#ffffff', // Pure white for paper elements
		},
		text: {
			primary: '#1e1e1e', // Almost black for primary text
			secondary: '#575757', // Dark gray for secondary text
			disabled: '#9e9e9e', // Light gray for disabled text
		},
		divider: '#e0e0e0', // Light gray divider lines
	},
	shape: {
		borderRadius: 6, // Default border-radius for all components
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
	/* palette: {
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
	}, */
	palette: {
		mode: 'dark',
		primary: {
			main: '#ffffff', // White as the primary color for contrast
			light: '#bdbdbd', // Light gray for hover states
			dark: '#757575', // Medium gray for active states
			contrastText: '#000000', // Black text on primary elements
		},
		secondary: {
			main: '#b0b0b0', // Light gray as a secondary color
			light: '#d6d6d6', // Lighter gray for secondary hover states
			dark: '#8c8c8c', // Darker gray for secondary active states
			contrastText: '#000000', // Black text on secondary elements
		},
		background: {
			default: '#121212', // Deep black for the main background
			paper: '#1e1e1e', // Dark gray for paper elements
		},
		text: {
			primary: '#ffffff', // White for primary text on dark backgrounds
			secondary: '#b0b0b0', // Light gray for secondary text
			disabled: '#757575', // Medium gray for disabled text
		},
		divider: '#333333', // Dark gray for divider lines
	},
	shape: {
		borderRadius: 6, // Default border-radius for all components
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
//const { darkMode } = useSelector((state: RootState) => state.userLogin);
const ThemeWrapper = () => (
	<Provider store={store}>
		<App />
	</Provider>
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
