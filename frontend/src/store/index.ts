import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import productsSlice from './products/slice';
import  cartSlice from './cart/slice';
import  userLoginSlice  from './user/slice';
import  orderSlice  from './order/slice';
import themeSlice  from './theme/slice';
export const store = configureStore({
	reducer: {
		products: productsSlice,
		cart: cartSlice,
		userLogin: userLoginSlice,
		order: orderSlice,
		theme : themeSlice
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
