import { RouteType } from '../types/common';

import { lazy } from 'react';

const HomePage = lazy(() => import('../pages/HomePage'));
const ProductDetailPage = lazy(() => import('../pages/HomePage/ProductDetail'));
const CartPage = lazy(() => import('../pages/HomePage/CartPage'));
const LoginPage = lazy(() => import('../pages/HomePage/LogInScreen'));
const registerPage = lazy(() => import('../pages/HomePage/RegisterUser'));
const ProfilePage = lazy(() => import('../pages/HomePage/Profile'));

export const routes: RouteType[] = [
	{ path: '/', component: HomePage, isPrivate: true, info: { title: 'HomePage' }},
	{ path: '/login', component: LoginPage, isPrivate: true, info: { title: 'LoginPage' }},
	{ path: '/register', component: registerPage, isPrivate: true, info: { title: 'registerPage' }},
	{ path: '/profile', component: ProfilePage, isPrivate: true, info: { title: 'ProfilePage' }},

	{
		path: '/product/:id',
		component: ProductDetailPage,
		isPrivate: true,
		info: { title: 'ProductDetailPage' },
	},
	{ path: '/cart/:id?', component: CartPage, isPrivate: true, info: { title: 'CartPage' }},
];
