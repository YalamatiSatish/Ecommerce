import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader = () => {
	return (
		<Box
			sx={{ display: 'flex', width: '100%', height:'100%', alignItems: 'center', justifyContent: 'center' }}
		>
			<CircularProgress />
		</Box>
	);
};

export default Loader;
