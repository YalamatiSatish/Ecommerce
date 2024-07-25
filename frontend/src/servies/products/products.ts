import /* axios, */ { CancelTokenSource } from 'axios';
import { HTTP } from '../http';
import { productType } from '../../types';
class ProductsService {
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

	fetchProductsList(cancelToken: CancelTokenSource) {
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
	}

}

export const productsService = new ProductsService();
