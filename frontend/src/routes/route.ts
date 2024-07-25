import { RouteType } from '../types/common';

import { lazy } from 'react';

const HomePage = lazy(() => import('../pages/HomePage'));
const ProductDetailPage = lazy(() => import('../pages/HomePage/ProductDetail'));

export const routes: RouteType[] = [
	{ path: '/', component: HomePage, isPrivate: true, info: { title: 'HomePage' }, },
	{ path: '/product/:id', component: ProductDetailPage, isPrivate: true, info: { title: 'ProductDetailPage' }, },
];
