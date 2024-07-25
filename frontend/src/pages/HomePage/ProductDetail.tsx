import { Box, Typography, Stack, Rating, Button } from '@mui/material';
import React, { useEffect /* useState */ } from 'react';
import { Link, useParams } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import { useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fetchProduceDetail } from '../../store/products/thunk';
const ProductDetail = () => {
	const { id } = useParams();
	const { products, loading, error, product } = useSelector((state: RootState) => state.products);
	console.log(products, products, '1111', loading, error);
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (id) {
			dispatch(fetchProduceDetail(Number(id)));
		}
	}, []);
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
		<Box
			sx={{
				padding: '20px 0px 0px 150px',
				'@media (max-width:1024px)': { padding: '20px' },
				backgroundColor: 'white',
			}}
		>
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
			<Box sx={{ display: 'flex', marginTop: '20px' }}>
				<CardMedia
					component='img'
					//height='140'
					image={product?.image}
					alt={product?.name}
					sx={{ height: '100%', width: '40%' }}
				/>
				<Box
					sx={{ display: 'flex', flexDirection: 'column', width: '30%', padding: '40px' }}
				>
					<Typography
						variant='h4'
						sx={{ borderBottom: '1px solid lightgrey', padding: '0px 20px 20px 20px' }}
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
								value={product?.rating ? product?.rating : 0}
								precision={0.5}
								readOnly
								sx={{ width: '140px' }}
							/>
							<Typography
								sx={{ display: 'flex', alignItems: 'center', paddingBottom: '6px' }}
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
					sx={{
						border: '1px solid lightgray',
						width: '18%',
						height: product?.countInStock === 0 ? '160px' : '200px',
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<Typography sx={{ borderBottom: '1px solid lightgray', padding: '10px' }}>
						{' '}
						Price: $ {product?.price}{' '}
					</Typography>
					<Typography sx={{ borderBottom: '1px solid lightgray', padding: '10px' }}>
						{' '}
						Status: {product?.countInStock === 0 ? 'Out of Stock' : 'In Stock'}{' '}
					</Typography>
					{ product?.countInStock > 0 && <Typography sx={{ borderBottom: '1px solid lightgray', padding: '10px' }}>
						 Qty: </Typography>

					}
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
						>
							{' '}
							ADD TO CART{' '}
						</Button>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default ProductDetail;
