import { createSlice } from '@reduxjs/toolkit';
import { createNewOrder } from './thunk';
import { OrderSlice } from '../../types/order';

const initialState: OrderSlice = {
	loading: 'idle',
	error: {
		error_detail: '',
		error_code: '',
		status_code: '',
	},
	orders: {
		orderItems: [],
		shippingAddress: { address: '', city: '', postalCode: '', country: '' },
		paymentMethod: '',
		itemsPrice: 0,
		taxPrice: 0,
		shippingPrice: 0,
		totalPrice: 0,
	},
};

export const orderSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder.addCase(createNewOrder.pending, (state) => {
			state.loading = 'loading';
		});
		builder.addCase(createNewOrder.fulfilled, (state, { payload }) => {
			if (payload) {
				state.orders = payload;
			}
			state.loading = 'succeeded';
		});
		builder.addCase(createNewOrder.rejected, (state, action) => {
			const payload = action.payload as OrderSlice;
			if (payload) {
				state.error = payload?.error || null;
			}
			state.loading = 'failed';
		});
	},
});

//export const { reducer} = orderSlice.actions;

// export the slice as a reducer
export default orderSlice.reducer;
