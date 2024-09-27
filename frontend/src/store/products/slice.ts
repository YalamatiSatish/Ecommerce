import { createSlice } from '@reduxjs/toolkit';
import { fetchProductsList, fetchProductDetail } from './thunk';
import { ProductsSlice } from '../../types/products';

const initialState: ProductsSlice = {
	loading: 'idle',
	products: [],
	product: {
		_id: 0,
		name: '',
		image: '',
		description: '',
		brand: '',
		category: '',
		price: 0,
		countInStock: 0,
		rating: 0,
		numReviews: 0,
		createdAt: '',
	},
	error: {
		error_detail: '',
		error_code: '',
		status_code: '',
	},
};

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// To get the list of products
		builder.addCase(fetchProductsList.pending, (state) => {
			state.loading = 'loading';
		});
		builder.addCase(fetchProductsList.fulfilled, (state, { payload }) => {
			console.log(payload, 'payload');
			if (payload) {
				state.products = payload;
			}
			state.loading = 'succeeded';
		});
		builder.addCase(fetchProductsList.rejected, (state, action) => {
			const payload = action.payload as ProductsSlice;
			if (payload) {
				state.error = payload?.error || null;
			}
			state.loading = 'failed';
		});

		// To get the detail of a single product
		builder.addCase(fetchProductDetail.pending, (state) => {
			state.loading = 'loading';
		});
		builder.addCase(fetchProductDetail.fulfilled, (state, { payload }) => {
			console.log(state.loading, 'check', payload);
			if (payload) {
				state.product = payload;
			}
			state.loading = 'succeeded';
		});
		builder.addCase(fetchProductDetail.rejected, (state, action) => {
			const payload = action.payload as ProductsSlice;
			if (payload) {
				state.error = payload?.error || null;
			}
			state.loading = 'failed';
		});
	},
});

//export const { reducer} = productsSlice.actions;

// export the slice as a reducer
export default productsSlice.reducer;
