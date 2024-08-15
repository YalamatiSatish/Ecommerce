import { Box, Typography, Stack, Rating, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import { useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fetchProductDetail } from '../../store/products/thunk';
import {
	productDetailMain,
	productDetailContainer,
	productDetailCart,
	productDetailTitleDescription,
	productDetailImg,
} from './style';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';
import SingleSelect from '../../components/SingleSelect';
import { OptionType } from '../../types';
//import { handleAddItemsToCart } from '../../store/cart/slice';

const ProductDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const { loading, error, product } = useSelector((state: RootState) => state.products);
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (id) {
			dispatch(fetchProductDetail(Number(id)));
		}
	}, []);


	// Select list of Items quantity
	const optionsSelectQty = [...Array(product?.countInStock).keys()].map((item) => {
		return { label: `${item + 1}`, value: item + 1 };
	});
	// quantity of product
	const [qty, setQty] = useState<OptionType | null>(
		{ label: '1', value: 1 } /* optionsSelectQty[0] */,
	);
	console.log(qty, 'qty');

	// Handle Add to Cart
	const handleAddToCart = () => {
		navigate(`/cart/${id}?qty=${qty?.value}`);
	}

	/* 	const [product, setProductList] = useState<productType>();

	console.log(product, 'check single product list');
	useEffect(() => {
		async function fetchProducts() {
			const { data } = await axios.get(`/api/products/${id}`);
			setProductList(data);
		}
		fetchProducts();
	}, []); */

	return (
		<Box>
			{loading === 'loading' ? (
				<Loader />
			) : loading === 'failed' ? (
				<ErrorMessage> {error?.error_detail} </ErrorMessage>
			) : (
				<Box sx={productDetailMain}>
					<Link
						to='/'
						style={{
							textDecoration: 'none',
							color: 'black',
							fontWeight: 700,
							fontSize: '20px',
						}}
					>
						Go Back
					</Link>
					<Box sx={productDetailContainer}>
						<CardMedia
							component='img'
							//height='140'
							image={product?.image}
							alt={product?.name}
							sx={productDetailImg}
						/>
						<Box sx={productDetailTitleDescription}>
							<Typography
								variant='h4'
								sx={{
									borderBottom: '1px solid lightgrey',
									padding: '0px 20px 20px 20px',
								}}
							>
								{' '}
								{product?.name}{' '}
							</Typography>
							<Typography variant='body2' color='text.secondary'>
								<Stack
									spacing={1}
									sx={{
										display: 'flex',
										alignItems: 'center',
										flexDirection: 'row',
										gap: '10px',
										borderBottom: '1px solid lightgrey',
										padding: '10px',
									}}
								>
									<Rating
										name='half-rating'
										value={product?.rating ? Number(product?.rating) : 0}
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
										{product?.numReviews} reviews
									</Typography>
								</Stack>
							</Typography>
							<Typography
								variant='h5'
								sx={{
									fontFamily: 'Roboto Mono',
									borderBottom: '1px solid lightgrey',
									padding: '20px',
								}}
							>
								Price: $ {product?.price}
							</Typography>
							<Typography sx={{ width: '90%', padding: '20px' }}>
								Description: {product?.description}
							</Typography>
						</Box>
						<Box
							sx={productDetailCart}
							style={{
								height: product?.countInStock === 0 ? '160px' : '240px',
							}} /*  {
						border: '1px solid lightgray',
						width:  '18%''80%',
						height: product?.countInStock === 0 ? '160px' : '200px',
						display: 'flex',
						flexDirection: 'column',
					} */
						>
							<Typography
								sx={{ borderBottom: '1px solid lightgray', padding: '10px' }}
							>
								{' '}
								Price: $ {product?.price}{' '}
							</Typography>
							<Typography
								sx={{ borderBottom: '1px solid lightgray', padding: '10px' }}
							>
								{' '}
								Status: {product?.countInStock === 0
									? 'Out of Stock'
									: 'In Stock'}{' '}
							</Typography>
							{product?.countInStock > 0 && (
								<Typography
									sx={{
										borderBottom: '1px solid lightgray',
										padding: '10px',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										gap: '16px',
									}}
								>
									Qty:{/* {product?.countInStock}{' '} */}{' '}
									<SingleSelect
										options={optionsSelectQty}
										value={qty}
										setValue={setQty}
									/>
								</Typography>
							)}
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignContent: 'center',
									marginTop: '12px',
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
									disabled={product?.countInStock === 0}
									onClick={handleAddToCart}
								>
									{' '}
									ADD TO CART{' '}
								</Button>
							</Box>
						</Box>
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default ProductDetail;
