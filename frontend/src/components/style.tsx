import { Theme } from '@mui/material';

export const HeaderOuterStyle = (theme: Theme) => ({
	backgroundColor: theme.palette.background.default,
	color: theme.palette.text.primary,

	//color: theme.palette.primary.dark,
	fontFamily: theme.typography.fontFamily,
	display: 'flex',
	alignItems: 'center',
	height: '100%',
	justifyContent: 'space-between',
	padding: '10px 40px',
	'@media (max-width:1024px)': {
		padding: '10px',
	},
	//backgroundColor: '#242323',
});

export const searchHeader = (theme: Theme) => ({
	//backgroundColor: 'white',
	padding: '0px 10px',
	borderRadius: theme.shape.borderRadius,
	width: '40%',
	backgroundColor: theme.palette.background.default,
	color: theme.palette.primary.dark,
	borderColor: theme.palette.primary.dark,
	borderWidth: '1px',
	borderStyle: 'solid',

	//boxShadow: '0px 0px 4px 0px gray'
});

export const singleSelectInput = (theme: Theme) => ({
	backgroundColor: theme.palette.background.default,
	color: theme.palette.primary.dark,
	input: { cursor: 'pointer' }, // to put the text Input area have a cursor:'pointer'
});

export const footerStyle = (theme: Theme) : React.CSSProperties  => ({
	backgroundColor: theme.palette.background.default,
	color: theme.palette.primary.dark,
	display: 'flex',
	justifyContent: 'center',
	position: 'fixed',
	bottom: '0',
	width: '100%',
});
