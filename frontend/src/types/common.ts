export interface PageInfo {
    title: string;
};

export interface RouteType {
    path : string;
    isPrivate?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: React.FC<any>;
    children?: RouteType[];
    info : PageInfo;
}

export interface RouteProps {
    routes: RouteType[];
    isLoggedIn: boolean;
}


export interface productType {
    _id: number;
    name: string;
    image: string;
    description: string;
    brand: string;
    category: string;
    price: number;
    countInStock: number;
    rating: number;
    numReviews: number;
    createdAt:string;
    qty?: number;
};

export interface OptionType {
    label: string;
    value: number;
};

export interface userType {
	id: number;
	_id: number;
	username: string;
	email: string;
	name: string;
	isAdmin: boolean;
}