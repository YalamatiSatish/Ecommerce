import { createSlice } from '@reduxjs/toolkit';
import { CartSlice } from '../../types/cart';

const cartItemsFromlocalStorage  = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems') || '')
	: [];

const initialState: CartSlice = {
	loading: 'idle',
	cartItems: cartItemsFromlocalStorage,
	error: {
		error_detail: '',
		error_code: '',
		status_code: '',
	},
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		handleAddItemsToCart: (state, action) => {
			if (action.payload !== null) {
				const item = action.payload;
				const existingItem = state.cartItems.length>0 ?  state.cartItems.find((x) => x._id === item._id) : null;

				if (existingItem) {
					return { ...state };
				} else {
					console.log(action.payload, 'payload', );
					localStorage.setItem( 'cartItems', JSON.stringify([...state.cartItems, action.payload] ))
					return { ...state, cartItems:[...state.cartItems, action.payload] };
				}
			}
		},
	},
	/* extraReducers: () => {

	}, */
});

export const { handleAddItemsToCart } = cartSlice.actions;

// export the slice as a reducer
export default cartSlice.reducer;
