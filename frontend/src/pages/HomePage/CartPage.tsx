/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { /* Link,  */ useLocation /* useNavigate */ } from 'react-router-dom';
import { useAppDispatch } from '../../store'; //
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fetchProductDetail } from '../../store/products/thunk';
import { handleAddItemsToCart } from '../../store/cart/slice';

import { Box, Typography, Grid /* Typography  */ /* Stack, Rating  */, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { cartGridOuter } from './style';
//import SingleSelect from '../../components/SingleSelect';
/* import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom'; */
/* type Props = {}; */

const CartPage = (/* props: Props */) => {
	const location = useLocation();
	const productId = Number(location.pathname.match(/\d+/g));
	//const productQty = Number(location.search.split('=')[1]);

	const { /* loading, error, */ product } = useSelector((state: RootState) => state.products);
	//console.log(productId, product)
	const { cartItems } = useSelector((state: RootState) => state.cart);

	const dispatch = useAppDispatch();
	useEffect(() => {
		if (productId) {
			dispatch(fetchProductDetail(productId));
		}
	}, [productId]);

	useEffect(() => {
		if (product._id !== '') {
			dispatch(handleAddItemsToCart(product));
		}
	}, [product]);

	return (
		<Box sx={{ marginLeft:'40px' }} >
			<h1>Your Cart </h1>
			{cartItems?.length === 0 && (
				<Box>
					<h2>No items in your Cart</h2>
					<h1>Total: $ 0.0</h1>
				</Box>
			)}
			{cartItems?.length > 0 && (
				<Box
					/* sx={{
						backgroundColor: 'white',
						display: 'flex',
						flexDirection: 'column',
						gap: '40px',
						padding: '40px',
					}} */
				>
					{cartItems?.map((cartItem, cartItemIndex) => (
						<Stack direction='row' spacing={2} key={cartItemIndex}>
							<Typography>{cartItem.name}</Typography>
							<Typography>Item 2</Typography>
							<Typography>Item 3</Typography>
						</Stack>
					))}
				</Box>
			)}
		</Box>
	);
};

export default CartPage;
/* <Grid
							container
							spacing={{ xs: 2, md: 6 }}
							columns={{ xs: 4, sm: 8, md: 12 }}
							key={cartItemIndex}
							sx={cartGridOuter}
						>
							<Grid item md={1.5}>
								<img
									srcSet={`${cartItem.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
									src={`${cartItem.image}?w=164&h=164&fit=crop&auto=format`}
									alt={cartItem.name}
									loading='lazy'
									style={{ width: '125px', height: '125px' }}
								/>
							</Grid>

							<Grid item md={1.5} sx={{ width: '140px' }}>
								{cartItem.name}
							</Grid>
							<Grid item md={1}>
								${cartItem.price}
							</Grid>
							<Grid item>
								<DeleteIcon />
							</Grid>
						</Grid> */

/* <Card
							key={cartItemIndex}
							sx={{ maxWidth: 345, minHeight: '250px', backgroundColor:'white',  }}
						>
							<CardActionArea>
								<Link to={`/product/${cartItem._id}`}>
									<CardMedia
										component='img'
										//height='140'
										image={cartItem.image}
										alt={cartItem.name}
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
										{cartItem.name}
									</Typography>
									<Typography variant='body2' color='text.secondary'>
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
												value={cartItem.rating}
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
												{cartItem.numReviews} reviews{' '}
											</Typography>
										</Stack>
									</Typography>
									<Typography
										variant='h5'
										sx={{ marginTop: '20px', fontFamily: 'Roboto Mono' }}
									>
										$ {cartItem.price}
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>*/
