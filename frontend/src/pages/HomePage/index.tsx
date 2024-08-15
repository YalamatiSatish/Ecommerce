import { Box, Typography } from '@mui/material';
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
	console.log(loading, 'loading', error);
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

	return (
		<Box
			sx={{ padding: '20px 0px 0px 150px', '@media (max-width:1024px)': { padding: '20px' }}}
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
						backgroundColor: 'white',
						marginTop:
							'40px' /* display:'flex', alignItems:'center', justifyContent:'center' */,
					}}
				>
					<Grid
						container
						spacing={{ xs: 2, md: 3 }}
						columns={{
							xs: 4,
							sm: 8,
							md: 12,
						}} /* spacing={{ xs: 2, sm: 8,  md: 12, lg:16, xl:20  }} columns={{ xs: 4, sm: 8, md: 12, lg:16, xl:20  }} */
					>
						{products &&
							products.map((product) => (
								<Grid
									item
									xs={4}
									sm={4}
									md={4}
									lg={16}
									xl={20}
									key={product._id}
									sx={{
										flexGrow: 1,
										backgroundColor: 'white',
										marginTop: '40px',
										width: '200%',
									}}
								>
									<Products product={product} /* key={product._id} */ />{' '}
								</Grid>
							))}
					</Grid>
				</Box>
			)}
		</Box>
	);
};

export default HomePage;
