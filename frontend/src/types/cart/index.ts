import { productType } from '../common';
import { ErrorDetail } from '../products';

export interface cartItemType extends productType {
	qty: number;
}

export interface shippingAddressType {
	address: '',
	city: '',
	postalCode: '',
	country: '',
}

export interface CartSlice {
	loading: 'idle' | 'loading' | 'succeeded' | 'failed';
	cartItems: cartItemType[] /* productType[] */;
	shippingAddress: shippingAddressType ;
	error: ErrorDetail;
}
