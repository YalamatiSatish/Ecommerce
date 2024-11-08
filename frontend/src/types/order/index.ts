import { ErrorDetail } from '../products';
//import { userType } from "../common";
import { cartItemType, shippingAddressType  } from '../cart';

export interface orderPayload {
    orderItems?: cartItemType[],
	shippingAddress?: shippingAddressType,
	paymentMethod?:string,
	itemsPrice?: number,
	taxPrice?: number,
	shippingPrice?:number,
	totalPrice?: number,
}

export interface OrderSlice {
	loading: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: ErrorDetail;
    orders:orderPayload
}