import { Theme } from '@mui/material';

export const HeaderOuterStyle = (theme: Theme) => ({
	backgroundColor: theme.palette.background.default,
	color: theme.palette.primary.dark,
	fontFamily: theme.typography.fontFamily,
	display: 'flex',
	justifyContent: 'space-between',
	padding: '10px',
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
	borderStyle:'solid'

	//boxShadow: '0px 0px 4px 0px gray'
});

export const singleSelectInput = () => ({
	backgroundColor: 'white',
	input: { cursor: 'pointer' }, // to put the text Input area have a cursor:'pointer'
});
