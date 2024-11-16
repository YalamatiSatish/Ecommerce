import { Typography, Box } from '@mui/material';
import { footerStyle } from './style';
import React from 'react';

const Footer = () => {
	return (
		<Box sx={footerStyle} >
			<Typography> Copyright &copy; ShopPro </Typography>
		</Box>
	);
};

export default Footer;
