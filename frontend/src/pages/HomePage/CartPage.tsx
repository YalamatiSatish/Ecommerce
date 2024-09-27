/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { /* Link,  */ useLocation, useNavigate /* */ } from 'react-router-dom';
import { useAppDispatch } from '../../store'; //
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fetchProductDetail } from '../../store/products/thunk';
import { handleAddItemsToCart, handleRemoveCartItems } from '../../store/cart/slice';

import {
	Box,
	Typography,
	/*Grid, Typography  */ /* Stack, Rating,  */ Stack,
	Button,
	Autocomplete,
	TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SingleSelect from '../../components/SingleSelect';
import { OptionType } from '../../types';
import { Link } from 'react-router-dom';
import { cartItemType } from '../../types/cart';
import CustomToolTip from '../../components/ToolTip';
import { singleSelectInput } from '../../components/style';
//import { cartGridOuter } from './style';
/* import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom'; */
/* type Props = {}; */

const CartPage = (/* props: Props */) => {
	const location = useLocation();
	const navigate = useNavigate();
	const productId = Number(location.pathname.match(/\d+/g));
	const productOrderQty = Number(location.search.split('=')[1]);
	console.log(productOrderQty, 'productOrderQty');
	const { /* loading, error, */ product } = useSelector((state: RootState) => state.products);
	console.log(product, 'product');
	const { cartItems } = useSelector((state: RootState) => state.cart);

	const dispatch = useAppDispatch();
	useEffect(() => {
		if (productId) {
			dispatch(fetchProductDetail(productId));
		}
	}, [productId]);
	console.log(dispatch, 'dispatch');
	useEffect(() => {
		console.log(product._id, 'idddddd');
		if (product._id !== 0 && productOrderQty > 0) {
			console.log('111111');
			const newCartItem = {
				_id: product._id,
				name: product.name,
				image: product.image,
				brand: product.brand,
				category: product.category,
				description: product.description,
				rating: product.rating,
				numReviews: product.numReviews,
				price: product.price,
				countInStock: product.countInStock,
				createdAt: product.createdAt,
				user: null,
				qty: productOrderQty,
			};
			/* (product.qty = productOrderQty); */

			console.log(newCartItem, 'newCartItem');
			dispatch(handleAddItemsToCart(newCartItem));
		}
	}, [dispatch]);

	// Select list of Items quantity
	const optionsSelectQty = (count: number) =>
		[...Array(count).keys()].map((item) => {
			return { label: `${item + 1}`, value: item + 1 };
		});
	// choose quantity of a product
	const [qty, setQty] = useState<OptionType | null>(
		{ label: '1', value: 1 } /* optionsSelectQty[0] */,
	);
	console.log(qty, 'qty');
	const removeItemsFromCart = (id: number) => {
		console.log(id, 'id');
		dispatch(handleRemoveCartItems(id));
	};

	// try chey
	//const handleChange = () => { console.log('change qty')};
	// If qty is changed for a existing cartItem
	/* 	useEffect(() => {

		const modifiedCartItem = {
			_id: product._id,
			name: product.name,
			image: product.image,
			brand: product.brand,
			category: product.category,
			description: product.description,
			rating: product.rating,
			numReviews: product.numReviews,
			price: product.price,
			countInStock: product.countInStock,
			createdAt: product.createdAt,
			user: null,
			qty: qty?.value,
		};

		console.log(modifiedCartItem, 'modifiedCartItem');
		dispatch(handleAddItemsToCart(modifiedCartItem));
	}, [qty]) */

	const handleModifyQuantityCartItem = (cartItemId: number, itemQty: number | undefined) => {
		console.log(itemQty, 'itemQty', cartItemId);
		const filteredCartItem = cartItems.filter((item) => item._id === cartItemId)[0];
		console.log(filteredCartItem, 'filterCartItem');
		const modifiedCartItem = {
			_id: filteredCartItem._id,
			name: filteredCartItem.name,
			image: filteredCartItem.image,
			brand: filteredCartItem.brand,
			category: filteredCartItem.category,
			description: filteredCartItem.description,
			rating: filteredCartItem.rating,
			numReviews: filteredCartItem.numReviews,
			price: filteredCartItem.price,
			countInStock: filteredCartItem.countInStock,
			createdAt: filteredCartItem.createdAt,
			user: null,
			qty: itemQty /* qty?.value */,
		};

		console.log(modifiedCartItem, 'modifiedCartItem');
		dispatch(handleAddItemsToCart(modifiedCartItem));
	};

	const handleCheckOut = () => {
		navigate(localStorage.getItem('userInfo') ? '/shipping' : '/login')
	};

	return (
		<Box sx={{ marginLeft: '40px', display: 'flex', gap: '10px' }}>
			<Box sx={{ display: 'flex', flexDirection: 'column', width: '60%' }}>
				<h1>Shopping Cart </h1>
				<Box>
					{cartItems?.length === 0 && (
						<Box
							sx={{
								backgroundColor: 'lightblue',
								color: 'white',
								fontWeight: 'bold',
								padding: '14px',
							}}
						>
							<h4>Your Cart is empty</h4>
						</Box>
					)}
					{cartItems?.length > 0 && (
						<Box
							sx={{ width: '100%' }}
							/* sx={{
						backgroundColor: 'white',
						display: 'flex',
						flexDirection: 'column',
						gap: '40px',
						padding: '40px',
					}} */
						>
							{cartItems?.map((cartItem, cartItemIndex) => (
								<Stack
									direction='row'
									spacing={2}
									key={cartItemIndex}
									sx={{
										width: '97%',
										padding: '20px',
										gap: '60px',
										borderBottom:
											cartItemIndex !== cartItems?.length - 1
												? '1px solid lightgray'
												: 'none',
										alignItems: 'center',
									}}
								>
									<Link to={`/product/${cartItem?._id}`}>
										<img
											src={cartItem?.image}
											style={{ width: '120px', height: '100px' }}
										/>
									</Link>
									<Typography sx={{ width: '15%' }}>{cartItem?.name}</Typography>
									<Typography sx={{ width: '10%' }}>
										$ {cartItem?.price}
									</Typography>
									<Box sx={{ width: '160px' }}>
										{/* <SingleSelect
											options={optionsSelectQty(cartItem.countInStock)}
											value={{
												value: cartItem.qty,
												label: `${cartItem.qty}`
											}}
											setValue={setQty}
										/> */}
										<Autocomplete
											disablePortal
											value={{
												value: cartItem?.qty,
												label: `${cartItem?.qty}`,
											}}
											//onChange={() => /* console.log('iddd', cartItem._id, cartItem.qty) */  dispatch(handleAddItemsToCart(cartItem._id, cartItem.qty))}
											onChange={(event: any, newValue: OptionType | null) => {
												setQty(newValue);
												handleModifyQuantityCartItem(
													cartItem?._id,
													newValue?.value,
												);
											}}
											id='combo-box-demo'
											options={optionsSelectQty(cartItem?.countInStock)}
											sx={{ width: '100%' }}
											renderInput={(params) => (
												<TextField
													{...params}
													placeholder='Select an Option'
													sx={singleSelectInput}
												/>
											)}
											getOptionLabel={(option) => option.label}
										/>
									</Box>

									<Button sx={{ padding: 'none' }}>
										<CustomToolTip title='delete'>
											<DeleteIcon
												onClick={() => {
													removeItemsFromCart(Number(cartItem?._id));
												}}
												sx={{ color: 'black' }}
											/>
										</CustomToolTip>
									</Button>
								</Stack>
							))}
						</Box>
					)}
				</Box>
			</Box>
			{/* {cartItems?.length > 0 && ( */}
			<Box
				sx={{
					width: '30%',
					border: '1px solid gray',
					backgroundColor: 'white',
					height: '20%',
					margin: '20px',
				}}
			>
				<Typography
					variant='h5'
					sx={{
						borderBottom: '1px solid gray',
						padding: '10px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					{' '}
					<span style={{ marginRight: '6px' }}> SUBTOTAL: </span>
					<strong style={{ textDecoration: 'underline' }}>
						{' '}
						{cartItems?.reduce((acc, curr) => acc + curr?.qty, 0)}{' '}
					</strong>
					{'    '}
					<span style={{ marginLeft: '6px' }}> </span> ITEMS
				</Typography>
				<Typography
					variant='h5'
					sx={{
						borderBottom: '1px solid gray',
						padding: '10px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					TOTAL PRICE :
					<strong>
						{' '}
						{cartItems
							.reduce((acc, curr) => acc + curr?.qty * curr?.price, 0)
							.toLocaleString('en-US', {
								style: 'currency',
								currency: 'USD',
							})}{' '}
					</strong>
				</Typography>
				<Typography
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						padding: '10px 0px',
					}}
				>
					<Button
						variant='contained'
						sx={{
							backgroundColor: '#00121A',
							color: 'white',
							padding: '10px 30px',
							fontWeight: 700,
							maxWidth: '80%',
						}}
						disabled={cartItems?.length === 0}
						onClick={() => handleCheckOut()}
					>
						PROCEED TO CHECK OUT
					</Button>
				</Typography>
			</Box>
			{/* )} */}
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
