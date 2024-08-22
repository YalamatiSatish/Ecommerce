import { Theme } from '@mui/material';

export const HeaderOuterStyle = (theme: Theme) => ({
	backgroundColor: theme.palette.primary.dark,
	fontFamily: theme.typography.fontFamily
});

export const singleSelectInput = () => ({
	backgroundColor: 'white',
	input: { cursor: 'pointer' }, // to put the text Input area have a cursor:'pointer'
});
