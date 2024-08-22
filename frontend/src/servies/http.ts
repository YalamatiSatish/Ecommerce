import axios, { AxiosInstance, AxiosResponse, CancelTokenSource } from 'axios';

const getCookie = (name: string) => {
	let cookieValue = null;
	if (document.cookie && document.cookie !== '') {
		const cookies = document.cookie.split(';');
		for (let i = 0; i < cookies.length; i++) {
			const cookie = cookies[i].trim();
			// Does this cookie string begin with the name we want?
			if (cookie.substring(0, name.length + 1) === name + '=') {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
};

if (process.env.NODE_ENV === 'production') {
	const element = document.getElementById('base_url')?.textContent || null;
	const baseUrl = element ? JSON.parse(element) : element;
	axios.defaults.withCredentials = true;
	axios.defaults.headers.common['X-CSRFToken'] = getCookie('csrftoken');
	axios.defaults.baseURL = baseUrl;
} else {
	const baseUrl = `http://${window.location.hostname}:8000`;
	axios.defaults.baseURL = baseUrl;
}

const getURL = () => {
	if (process.env.NODE_ENV === 'production') {
		const element = document.getElementById('base_url')?.textContent || null;
		const baseUrl = element ? JSON.parse(element) : element;
		return baseUrl;
	}
	const baseUrl = `http://${window.location.hostname}:8000`;
	return baseUrl;
};

axios.defaults.headers.post['Content-Type'] = 'application/json';

// Create a base Axios instance with the API URL
const baseInstance: AxiosInstance = axios.create({
	baseURL: getURL(),
});

// Define type for headers
type HeadersProps = {
	[key: string]: string;
};
interface APIParamsType {
	method: 'get' | 'post' | 'put' | 'patch' | 'delete';
	route: string;
	body?: object;
	isAuthenticated?: boolean;
	params?: object;
	cancelToken: CancelTokenSource;
	headersProps?: any;
}

/**
 * Get an Axios instance based on authentication and request parameters.
 * @param isAuthenticated - Whether the request is authenticated.
 * @param headersProps - Custom headers for the request.
 * @param params - Request parameters.
 * @param cancelToken - Token for cancelling the request.
 * @returns Axios instance.
 */
function getInstance({
	isAuthenticated = false,
	headersProps = {},
	params,
	cancelToken,
}: {
	isAuthenticated?: boolean;
	headersProps?: HeadersProps;
	params?: object;
	cancelToken: CancelTokenSource;
}): AxiosInstance {
	// Create a new Axios instance with cancel token if authenticated
	const instance: AxiosInstance = isAuthenticated
		? axios.create({ ...baseInstance.defaults, cancelToken: cancelToken.token })
		: baseInstance;

	// Set common headers and default params
	instance.defaults.headers.common = headersProps;
	instance.defaults.headers.common['X-CSRFToken'] = getCookie('csrftoken');
	instance.defaults.params = params;
	return instance;
}

/**
 * Make an API call using Axios.
 * @param method - HTTP method (get, post, put, delete).
 * @param route - Request route.
 * @param body - Request body for POST and PUT.
 * @param isAuthenticated - Whether the request is authenticated.
 * @param params - Request parameters.
 * @param cancelToken - Token for cancelling the request.
 * @returns Promise containing Axios response.
 */
function callAPI<T>({
	method,
	route,
	body,
	isAuthenticated = false,
	params,
	cancelToken,
	headersProps,
}: APIParamsType): Promise<AxiosResponse<T>> {
	const instance = getInstance({ isAuthenticated, headersProps, params, cancelToken });
	switch (method) {
		case 'get':
		case 'delete':
			return instance[method]<T>(route, { cancelToken: cancelToken.token });
		case 'post':
		case 'put':
			return instance[method]<T>(route, body, { cancelToken: cancelToken.token });
		case 'patch':
			return instance[method]<T>(route, body, { cancelToken: cancelToken.token });
		default:
			throw new Error(`Invalid HTTP method: ${method}`);
	}
}

/**
 * Get a CancelTokenSource instance for cancelling requests.
 * @returns CancelTokenSource instance.
 */
export const getCancelToken = (): CancelTokenSource => axios.CancelToken.source();

/**
 * Object containing methods for making API requests.
 */
export const HTTP = {
	/**
	 * Make a GET request.
	 */
	Get: <T>(params: Omit<APIParamsType, 'method'>) => callAPI<T>({ ...params, method: 'get' }),

	/**
	 * Make a POST request.
	 */
	Post: <T>(params: Omit<APIParamsType, 'method'>) => callAPI<T>({ ...params, method: 'post' }),

	/**
	 * Make a PUT request.
	 */
	Put: <T>(params: Omit<APIParamsType, 'method'>) => callAPI<T>({ ...params, method: 'put' }),
	/**
	 * Make a Patch request.
	 */
	Patch: <T>(params: Omit<APIParamsType, 'method'>) => callAPI<T>({ ...params, method: 'patch' }),
	/**
	 * Make a DELETE request.
	 */
	Delete: <T>(params: Omit<APIParamsType, 'method'>) =>
		callAPI<T>({ ...params, method: 'delete' }),
};

export const returnURL = () => {
	if (process.env.NODE_ENV === 'production') {
		const element = document.getElementById('base_url')?.textContent || null;
		const baseUrl = element ? JSON.parse(element) : element;
		return baseUrl;
	}
	const baseUrl = `http://${window.location.hostname}:8000`;
	return baseUrl;
};
