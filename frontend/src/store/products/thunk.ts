import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { getCancelToken } from '../../servies/http';
import { productsService } from '../../servies/products/products';

export const fetchProductsList = createAsyncThunk(
	'productsList',
	async(body: null, { signal, rejectWithValue }) => {
		try {
			const source = getCancelToken();
			signal.addEventListener('abort', () => {
				source.cancel();
			});
			const response = await productsService.fetchProductsList(source);
			return response.data;
		} catch (err: AxiosError | unknown) {
			const error = err as AxiosError;
			return rejectWithValue(error.response?.data);
		}
	},
);

export const fetchProductDetail =  createAsyncThunk(
	'productDetail',
	async(productId:number, { signal, rejectWithValue } ) => {
		try {
			const source = getCancelToken();
			signal.addEventListener('abort', () => {
				source.cancel();
			});
			const response = await productsService.fetchProductDetail(productId, source);
			return response.data;
		} catch (err: AxiosError | unknown) {
			const error = err as AxiosError;
			return rejectWithValue(error.response?.data);
		}
	},
);
