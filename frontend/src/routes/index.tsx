import React, { FC, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { RouteProps } from '../types/common';
import { routes } from './route';
const RouteProvider: FC = () => {
	// Generate nested routes usiing the map function
	const generateRoutes = ({ routes, isLoggedIn }: RouteProps) => {
		return routes.map((route, index) => {
			const { path, component: Component, children } = route;

			if (children) {
				const childRoute: RouteProps = {
					routes: children,
					isLoggedIn: isLoggedIn,
				};
				// Generate nested routes recursively
				const nestedRoutes = generateRoutes(childRoute);

				return (
					<Route key={index} path={path} element={<Component />}>
						{nestedRoutes}
					</Route>
				);
			}

			return <Route key={index} path={path} element={<Component />} />;
		});
	};

	const routeProps: RouteProps = {
		routes: routes,
		isLoggedIn: true,
	};
	return (
		<Suspense fallback={<div> Loading ...</div>}>
			<Routes> {generateRoutes(routeProps)} </Routes>
		</Suspense>
	);
};

export default RouteProvider;
