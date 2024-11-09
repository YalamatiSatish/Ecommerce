import { Box, Typography, /* Container, Card  */ } from '@mui/material';
import React, { FC, useEffect /* useState */ } from 'react';
import { RouteType } from '../../types/common';
import Products from './Products';
//import products from '../../products';
import Grid from '@mui/material/Grid';
//import { productType } from '../../types/common';
//import axios from 'axios';
import { fetchProductsList } from '../../store/products/thunk';
import { useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';

const HomePage: FC<RouteType> = () => {
	const { products, loading, error } = useSelector((state: RootState) => state.products);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchProductsList(null));
	}, []);
	//const [productsList, setProductsList] = useState<productType[]>([]);

	//console.log(productsList, 'check product list');
	/* useEffect(() => {
		async function fetchProducts() {
			const { data } = await axios.get('/api/products/');
			setProductsList(data);
		}
		fetchProducts();
	}, []); */

	/* 	const ResponsiveCardGrid: React.FC = () => {
		return (
			<Container maxWidth="lg" sx={{ padding: 2 }}>
				<Grid container spacing={4}>
					{products &&
						products.map((product) => (
							<Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
								<Card sx={{ height: '100%' }}>
									<Products product={product} />{' '}
								</Card>
							</Grid>
						))}
				</Grid>
			</Container>
		);
	}; */

	/* <Container maxWidth="lg" sx={{ padding: 2 }}>
			<Grid container spacing={4}>
			  {cardData.map((card) => (
				<Grid item xs={12} sm={6} md={4} lg={3} key={card.id}>
				  <Card sx={{ height: '100%' }}>
					<CardMedia
					  component="img"
					  height="140"
					  image={card.image}
					  alt={card.title}
					/>
					<CardContent>
					  <Typography gutterBottom variant="h5" component="div">
						{card.title}
					  </Typography>
					  <Typography variant="body2" color="text.secondary">
						{card.description}
					  </Typography>
					</CardContent>
				  </Card>
				</Grid>
			  ))}
			</Grid>
		</Container> */

	return (
		<Box
			sx={{
				padding: '20px 0px 0px 150px',
				'@media (max-width:1024px)': { padding: '20px' },
				backgroundColor: '',
			}}
		>
			<Typography variant='h3' sx={{ letterSpacing: '1.5px' }}>
				{' '}
				LATEST PRODUCTS
			</Typography>
			{loading === 'loading' ? (
				<Loader />
			) : loading === 'failed' ? (
				<ErrorMessage> {error?.error_detail} </ErrorMessage>
			) : (
				<Box
					sx={{
						flexGrow: 1,
						backgroundColor: 'red',
						marginTop: '40px',
					}}
				>
					<Grid
						container
						spacing={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
						columns={{
							xs: 4,
							sm: 8,
							md: 12,
						}}
					>
						{products &&
							products.map((product) => (
								<Grid
									item
									xs={4}
									sm={4}
									md={6}
									lg={6}
									xl={20}
									key={product._id}
									sx={{
										flexGrow: 1,
										backgroundColor: 'white',
										marginTop: '40px',
										width: '200%',
									}}
								>
									<Products product={product} />{' '}
								</Grid>
							))}
					</Grid>
				</Box>
			)}
		</Box>
	);
};

export default HomePage;
