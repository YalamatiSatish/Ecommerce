import React from 'react';
import { Box, Stack, Rating } from '@mui/material';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { productType } from '../../types';
import { Link } from 'react-router-dom';
import { productCard } from './style';
interface ProductsType {
	key?: string;
	product: productType;
}

const Products = ({ product }: ProductsType) => {
	return (
		<Box key={product._id}>
			{' '}
			<Card sx={productCard}>
				<CardActionArea>
					<Link to={`/product/${product._id}`}>
						<CardMedia
							component='img'
							//height='140'
							image={product.image}
							alt={product.name}
							sx={{ minHeight: 100 }}
						/>
					</Link>
					<CardContent sx={{ minHeight: '150px' }}>
						<Typography
							gutterBottom
							variant='h5'
							component='div'
							sx={{ minHeight: '60px' }}
						>
							{product.name}
						</Typography>
						<Typography variant='body2' color='text.secondary'>
							{/* {product.rating } from {product.numReviews} reviews */}
							<Stack
								spacing={1}
								sx={{
									display: 'flex',
									alignItems: 'center',
									flexDirection: 'row',
									gap: '10px',
								}}
							>
								<Rating
									name='half-rating'
									value={product.rating}
									precision={0.5}
									readOnly
									sx={{ width: '140px' }}
								/>
								<Typography
									sx={{
										display: 'flex',
										alignItems: 'center',
										paddingBottom: '6px',
									}}
								>
									{' '}
									{product.numReviews} reviews{' '}
								</Typography>
							</Stack>
						</Typography>
						<Typography
							variant='h5'
							sx={{ marginTop: '20px', fontFamily: 'Roboto Mono' }}
						>
							$ {product.price}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Box>
	);
};

export default Products;
