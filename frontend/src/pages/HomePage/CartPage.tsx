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
import { OptionType } from '../../types';
import { Link } from 'react-router-dom';
import CustomToolTip from '../../components/ToolTip';
import { singleSelectInput } from '../../components/style';
import {
	cartPageMain,
	cartPageCheckOut,
	cartPageItems,
	cartImage,
	cartItemDesc,
	cartItemPrice,
	cartItemSelect,
} from './style';
import { cartItemType } from '../../types/cart';
import { buttonStyle } from './style';

/* import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom'; */
/* type Props = {}; */
export interface CartItemProps {
	cartItem: cartItemType;
	key: number;
}

const CartPage = (/* props: Props */) => {
	const location = useLocation();
	const navigate = useNavigate();
	const productId = Number(location.pathname.match(/\d+/g));
	const productOrderQty = Number(location.search.split('=')[1]);
	const { /* loading, error, */ product } = useSelector((state: RootState) => state.products);
	const { cartItems } = useSelector((state: RootState) => state.cart);

	const dispatch = useAppDispatch();
	useEffect(() => {
		if (productId) {
			dispatch(fetchProductDetail(productId));
		}
	}, [productId]);
	useEffect(() => {
		if (product._id !== 0 && productOrderQty > 0) {
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
	const removeItemsFromCart = (id: number) => {
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
		const filteredCartItem = cartItems.filter((item) => item._id === cartItemId)[0];
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

		dispatch(handleAddItemsToCart(modifiedCartItem));
	};

	const handleCheckOut = () => {
		navigate(localStorage.getItem('userInfo') ? '/shipping' : '/login');
	};


	const CartPageitem: React.FC<CartItemProps> = ({ cartItem, key }) => {
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
					<Box component='img' sx={cartImage} src={cartItem?.image} />
				</Link>
				<Typography sx={cartItemDesc}>{cartItem?.name}</Typography>
				<Typography sx={cartItemPrice}>$ {cartItem?.price}</Typography>
				<Box sx={cartItemSelect}>
					<Autocomplete
						disablePortal
						value={{
							value: cartItem?.qty,
							label: `${cartItem?.qty}`,
						}}
						onChange={(event: any, newValue: OptionType | null) => {
							setQty(newValue);
							handleModifyQuantityCartItem(cartItem?._id, newValue?.value);
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

				<Button
					sx={{
						padding: 'none',
						display: 'flex',
						//width: '100%',
						justifyContent: 'flex-start',
					}}
				>
					<CustomToolTip title='delete'>
						<DeleteIcon
							onClick={() => {
								removeItemsFromCart(Number(cartItem?._id));
							}}
							sx={{ color: 'inherit' }}
						/>
					</CustomToolTip>
				</Button>
			</Box>
		);
	};

	return (
		<Box sx={cartPageMain} >

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					//padding: '10px',
					width: '100%',
				}}
			>
				<h1>Shopping Cart </h1>
				{cartItems?.length === 0 && (
					<Box
						sx={{
							color: 'inherit',
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
							<CartPageitem cartItem={cartItem} key={cartItemIndex} />
						))}
					</Box>
				)}
			</Box>

			<Box sx={cartPageCheckOut} >
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
						sx={buttonStyle}
						disabled={cartItems?.length === 0}
						onClick={() => handleCheckOut()}
					>
						PROCEED TO CHECK OUT
					</Button>
				</Typography>
			</Box>
		</Box>
	);
};

export default CartPage;
