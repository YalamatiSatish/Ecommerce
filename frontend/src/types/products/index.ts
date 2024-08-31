import { productType } from '../common';

export interface ProductsSlice {
	loading: 'idle' | 'loading' | 'succeeded' | 'failed';
	products: productType[];
	product: productType;
	error: ErrorDetail;
}

export type ErrorDetail = {
	error_detail: string;
	error_code: string;
	status_code: string;
};
