import { /* axios, */ CancelTokenSource } from 'axios';
import { HTTP } from '../http';
//import { userType } from '../../types';
//import { loggedInUserType } from '../../types/user';
class UsersService {
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

	fetchUserLogin(
		requestData: { username: string; password: string },
		cancelToken: CancelTokenSource,
	) {
		return HTTP.Post<any>({
			route: '/api/users/login',
			cancelToken,
			body: requestData,
		});
	}

	registerNewuser(
		requestData: { name: string; email: string; password: string },
		cancelToken: CancelTokenSource,
	) {
		return HTTP.Post<any>({
			route: '/api/users/register',
			cancelToken,
			body: requestData,
		});
	}

	updateUserProfile(
		requestData: { name: string; email: string; password: string },
		accessToken: string,
		cancelToken: CancelTokenSource,
	) {
		return HTTP.Put<any>({
			route: '/api/users/profile/update/',
			cancelToken,
			body: requestData,
			headersProps: accessToken !== '' ? { Authorization: `Bearer ${accessToken}` } : {},
		});
	}

	// fetch a single user information
	fetchUserProfileDetail(accessToken: string, cancelToken: CancelTokenSource) {
		return HTTP.Get<any>({
			route: `/api/users/profile`,
			cancelToken,
			headersProps: accessToken !== '' ? { Authorization: `Bearer ${accessToken}` } : {},
		});
	}

	/* fetchProductDetail(productId:number, cancelToken: CancelTokenSource) {
		return HTTP.Get<productType>({
			route: `/api/products/${productId}`,
			cancelToken,
		});
	} */
}

export const usersService = new UsersService();
