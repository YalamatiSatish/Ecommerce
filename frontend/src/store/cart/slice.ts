import { createSlice } from '@reduxjs/toolkit';
import { CartSlice } from '../../types/cart';

const cartItemsFromlocalStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems') || '')
	: [];

console.log(cartItemsFromlocalStorage, 'cartItemsFromlocalStorage');

const shippingAddressFromlocalStorage = localStorage.getItem('shippingAddress')
	? JSON.parse(localStorage.getItem('shippingAddress') || '')
	: { address: '', city: '', postalCode: '', country: '' };

const initialState: CartSlice = {
	loading: 'idle',
	cartItems: cartItemsFromlocalStorage,
	shippingAddress: shippingAddressFromlocalStorage,
	paymentMethod: '',
	error: {
		error_detail: '',
		error_code: '',
		status_code: '',
	},
};
console.log(initialState.cartItems, '111111');
export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		handleAddItemsToCart: (state, action) => {
			if (action.payload !== null) {
				const { productItem } = action.payload;

				const existingItem =
					state.cartItems.length && productItem > 0
						? state.cartItems.find((x) => x._id === productItem._id)
						: null;
				console.log(existingItem, 'existing');
				if (existingItem) {
					console.log('000000');
					return { ...state };
				} else if (
					state.cartItems.filter((item) => item._id === action.payload._id)?.length === 0
				) {
					console.log('111111');
					localStorage.setItem(
						'cartItems',
						JSON.stringify([...state.cartItems, action.payload]),
					);
					return {
						...state,
						cartItems: [...state.cartItems, action.payload],
					};
				} else if (
					state.cartItems.filter((item) => item._id === action.payload._id)[0]?.qty !==
					action.payload?.qty
				) {
					console.log('222222');

					localStorage.setItem(
						'cartItems',
						JSON.stringify([
							...state.cartItems.filter((item) => item._id !== action.payload._id),
							action.payload,
						]),
					);
					return {
						...state,
						cartItems: [
							...state.cartItems.filter((item) => item._id !== action.payload._id),
							action.payload,
						],
					};
				} else {
					console.log('333333');

					localStorage.setItem(
						'cartItems',
						JSON.stringify([...state.cartItems, action.payload]),
					);
					return {
						...state,
						cartItems: [...state.cartItems, action.payload],
					};
				}
			}
		},
		handleRemoveCartItems: (state, action) => {
			if (action.payload !== null) {
				localStorage.setItem(
					'cartItems',
					JSON.stringify([
						...state.cartItems.filter((cartItem) => cartItem._id !== action.payload),
					]),
				);
				return {
					...state,
					cartItems: [
						...state.cartItems.filter((cartItem) => cartItem._id !== action.payload),
					],
				};
			}
		},
		handleShippingAddressItems: (state, action) => {
			if (action.payload !== null) {
				const { address, city, postalCode, country } = action.payload;
				localStorage.setItem(
					'shippingAddress',
					JSON.stringify(
						{
							address,
							city,
							postalCode,
							country,
						} /* [...state.shippingAddress, action.payload] */,
					),
				);
				return {
					...state,
					shippingAddress: {
						address,
						city,
						postalCode,
						country,
					} /* [...state.shippingAddress, action.payload] */,
				};
			}
		},
		handleSavePaymentMethod: (state, action) => {
			if (action.payload !== null) {
				localStorage.setItem(
					'paymentMethod',
					JSON.stringify(
						action.payload,
					),
				);
				return {
					...state,
					paymentMethod: action.payload,
				};
			}
			//...state,
		},
	},
	/* extraReducers: () => {

	}, */
});

export const {
	handleAddItemsToCart,
	handleRemoveCartItems,
	handleShippingAddressItems,
	handleSavePaymentMethod,
} = cartSlice.actions;

// export the slice as a reducer
export default cartSlice.reducer;
