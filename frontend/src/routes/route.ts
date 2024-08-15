import { RouteType } from '../types/common';

import { lazy } from 'react';

const HomePage = lazy(() => import('../pages/HomePage'));
const ProductDetailPage = lazy(() => import('../pages/HomePage/ProductDetail'));
const CartPage = lazy(() => import('../pages/HomePage/CartPage'));

export const routes: RouteType[] = [
	{ path: '/', component: HomePage, isPrivate: true, info: { title: 'HomePage' }},
	{
		path: '/product/:id',
		component: ProductDetailPage,
		isPrivate: true,
		info: { title: 'ProductDetailPage' },
	},
	{ path: '/cart/:id?', component: CartPage, isPrivate: true, info: { title: 'CartPage' }},
];
