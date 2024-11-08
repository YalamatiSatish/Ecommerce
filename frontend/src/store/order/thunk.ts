import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { getCancelToken } from '../../servies/http';
import { OrderService } from '../../servies/order/order';
import { cartItemType, shippingAddressType } from '../../types/cart';
export const createNewOrder = createAsyncThunk(
	'createNewOrder',
	async(
		args: {
			body: {
				orderItems: cartItemType[];
				shippingAddress: shippingAddressType;
				paymentMethod: string;
				itemsPrice: number;
				taxPrice: number;
				shippingPrice: number;
				totalPrice: number;
			};
			accessToken: string;
		},

		{ signal, rejectWithValue },
	) => {
		console.log(args.body, 'createOrder');
		try {
			const source = getCancelToken();
			signal.addEventListener('abort', () => {
				source.cancel();
			});
			const response = await OrderService.addNewOrder(args.body, args.accessToken, source);
			//localStorage.setItem('userInfo', JSON.stringify(response.data));
			return response.data;
		} catch (err: AxiosError | unknown) {
			const error = err as AxiosError;
			return rejectWithValue(error.response?.data);
		}
	},
);
