import React from 'react';
import { Box, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header style={{ backgroundColor: '#1e1e1e', color: 'white' }}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					height: '10vh',
					gap: '40px',
					marginLeft: '150px',
					'@media (max-width:1024px)': {
						gap: '20px',
						marginLeft: '40px',
					},
				}}
			>
				<Typography sx={{ fontWeight: '600', fontSize: '24px' }}>
					{' '}
					<Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
						{' '}
						PROSHOP{' '}
					</Link>{' '}
				</Typography>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<ShoppingCartIcon />
					<Typography>
						{' '}
						<Link to='/cart' style={{ textDecoration: 'none', color: 'white' }}>
							{' '}
							CART{' '}
						</Link>{' '}
					</Typography>
				</Box>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<PersonIcon />
					<Typography>
						{' '}
						<Link to='/login' style={{ textDecoration: 'none', color: 'white' }}>
							{' '}
							LOGIN{' '}
						</Link>{' '}
					</Typography>
				</Box>
			</Box>
		</header>
	);
};

export default Header;
