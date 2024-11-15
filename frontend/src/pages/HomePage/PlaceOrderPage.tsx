/* eslint-disable no-unused-vars */

import React from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import CheckOut from '../../components/CheckOut';
import { placeOrderMain } from './style';
import {
	cartPageItems,
	cartImage,
	cartItemDesc,
	cartItemPrice,
	placeOrderOuter,
	placeOrderCheckOut,
	placeOrderElement,
	placeOrderSecond,
	placeOrderCartImage,
	placeOrderCartItemDesc,
	placeOrderCartItemPrice,
} from './style';
import { CartItemProps } from './CartPage';

import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useAppDispatch } from '../../store';
import { useNavigate } from 'react-router-dom';

import { createNewOrder } from '../../store/order/thunk';
import { buttonStyle } from './style';

const PlaceOrderPage = () => {
	const { cartItems, shippingAddress, paymentMethod } = useSelector(
		(state: RootState) => state.cart,
	);
	const { userloginDetails } = useSelector((state: RootState) => state.userLogin);
	const { loading, error } = useSelector((state: RootState) => state.order);
	console.log(loading, error, 'check_loading');
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const totalItemsPrice = cartItems
		.reduce((acc, item) => acc + item.price * item.qty, 0)
		.toFixed(2);
	const shippingPrice = Number(totalItemsPrice) > 100 ? 0 : 10;
	const taxAmount = Number(totalItemsPrice) * 0.085;
	const totalOrderPrice = Number(totalItemsPrice) + Number(shippingPrice) + Number(taxAmount);

	const PlaceOrderCartItem: React.FC<CartItemProps> = ({ cartItem, key }) => {
		return (
			<Box
				//direction='row'
				//spacing={2}
				key={key}
				style={{
					borderBottom: key !== cartItems?.length - 1 ? '1px solid lightgray' : 'none',
				}}
				//sx={cartPageItems}
				sx={cartPageItems}
			>
				<Link to={`/product/${cartItem?._id}`}>
					<Box component='img' sx={placeOrderCartImage} src={cartItem?.image} />
				</Link>
				<Typography sx={placeOrderCartItemDesc}>{cartItem?.name}</Typography>
				<Typography sx={placeOrderCartItemPrice}>
					{' '}
					{cartItem?.qty} x $ {cartItem?.price} = ${' '}
					{(cartItem?.qty * cartItem?.price).toFixed(2)}{' '}
				</Typography>
			</Box>
		);
	};

	// If payment Method is not available push the user to the payment page

	React.useEffect(() => {
		if (paymentMethod === '') {
			console.log('Please_check', paymentMethod);
			navigate('/payment');
		}
	}, []);

	// call to create a new order
	const handleCreateOrder = () => {
		if (userloginDetails !== null) {
			const args = {
				body: {
					orderItems: cartItems,
					shippingAddress: shippingAddress,
					paymentMethod: paymentMethod,
					itemsPrice: Number(totalItemsPrice),
					taxPrice: taxAmount,
					shippingPrice: shippingPrice,
					totalPrice: totalOrderPrice,
				},
				accessToken: userloginDetails.token,
			};

			dispatch(createNewOrder(args));
		}
	};

	return (
		<Box sx={placeOrderMain}>
			<CheckOut step={3} />
			<Box sx={placeOrderSecond /* { display: 'flex', flexWrap: 'wrap' } */}>
				<Box sx={placeOrderOuter}>
					<nav aria-label='secondary mailbox folders'>
						<List disablePadding sx={{ padding: '10px 0px' }}>
							<Typography> SHIPPING </Typography>

							<Box /* sx={{ padding: '0px 16px 10px 16px' }} */>
								shipping: {shippingAddress.address}, {shippingAddress.city},{' '}
								{shippingAddress.postalCode}, {shippingAddress.country}
							</Box>
						</List>
					</nav>
					<Divider />

					<nav aria-label='secondary mailbox folders'>
						<List disablePadding sx={{ padding: '10px 0px' }}>
							<Typography> PAYMENT METHOD</Typography>

							<Box /* sx={{ padding: '0px 16px 10px 16px' }} */>
								Method: {paymentMethod}
							</Box>
						</List>
					</nav>
					<Divider />
					<nav aria-label='secondary mailbox folders'>
						<List>
							<Typography> ORDER ITEMS</Typography>

							<Box /* sx={{ padding: '0px 16px 10px 16px' }} */>
								{cartItems?.length === 0 ? (
									<h4>Your Cart is empty</h4>
								) : (
									<Box>
										<Box sx={{ width: '100%' }}>
											{cartItems?.map((cartItem, cartItemIndex) => (
												<PlaceOrderCartItem
													cartItem={cartItem}
													key={cartItemIndex}
												/>
											))}
										</Box>
									</Box>
								)}
							</Box>
						</List>
					</nav>
				</Box>
				<Box sx={placeOrderCheckOut}>
					<Typography variant='h4' sx={placeOrderElement}>
						{' '}
						ORDER SUMMARY{' '}
					</Typography>
					<Typography variant='h6' sx={placeOrderElement}>
						<span>Items count: </span>
						<span> {cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
					</Typography>
					<Typography variant='h6' sx={placeOrderElement}>
						<span>Items price: </span>
						<span>$ {totalItemsPrice}</span>
					</Typography>

					<Typography variant='h6' sx={placeOrderElement}>
						<span>Shipping : </span>
						<span>$ {shippingPrice}</span>
					</Typography>
					<Typography variant='h6' sx={placeOrderElement}>
						<span>Tax: </span>
						<span>$ {taxAmount.toFixed(2)}</span>
					</Typography>
					<Typography variant='h6' sx={placeOrderElement}>
						<span> Total Price: </span>
						<span>$ {totalOrderPrice.toFixed(2)}</span>
					</Typography>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							padding: '10px',
						}}
						style={{ border: 'none' }}
					>
						<Button
							variant='contained'
							sx={buttonStyle}
							disabled={cartItems?.length === 0}
							onClick={() => handleCreateOrder()}
						>
							Place Order
						</Button>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default PlaceOrderPage;
