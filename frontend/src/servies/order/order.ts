import { /* axios, */ CancelTokenSource } from 'axios';
import { HTTP } from '../http';
import { cartItemType, shippingAddressType } from '../../types/cart';

class orderService {
	private authenticated = false;

	/**
	 * get partner-list using API call.
	 * @param cancelToken - Token for cancelling the request.
	 * @returns Promise containing login response.
	 */
	/* example
    fetchList(cancelToken: CancelTokenSource) {
		return HTTP.Get<PartnerResponse>({
			route: '/api/admin/partner/',
			cancelToken,
		});
	} */

	/* 	fetchProductsList(cancelToken: CancelTokenSource) {
		return HTTP.Get<productType[]>({
			route: '/api/products/',
			cancelToken,
		});
	}

	fetchProductDetail(productId:number, cancelToken: CancelTokenSource) {
		return HTTP.Get<productType>({
			route: `/api/products/${productId}`,
			cancelToken,
		});
	} */

	addNewOrder(
		requestData: { orderItems: cartItemType[],
			shippingAddress: shippingAddressType,
			paymentMethod:string,
			itemsPrice: number,
			taxPrice: number,
			shippingPrice:number,
			totalPrice: number,
		},
		accessToken: string,
		cancelToken: CancelTokenSource,
	) {
		return HTTP.Post({
			route: 'api/orders/addOrder',
			cancelToken,
			body: requestData,
			headersProps: accessToken !== '' ? { Authorization: `Bearer ${accessToken}` } : {},
		});
	}
}

export const OrderService = new orderService();
