import { ErrorDetail } from '../products';
//import { userType } from "../common";

export interface UserSlice {
	loading: 'idle' | 'loading' | 'succeeded' | 'failed';
	userloginDetails: loggedInUserType | null;
    userRegister:registerdUserType | null;
	userProfile:registerdUserType | null;
	error: ErrorDetail;
	darkMode: boolean;
}

export interface loggedInUserType {
	refresh: string;
	access: string;
	id: number;
	_id: number;
	username: string;
	email: string;
	name: string;
	isAdmin: boolean;
	token: string;
}
export type registerdUserType = Omit<loggedInUserType, 'refresh' | 'access' >

/* export interface registerdUserType {
	refresh: string;
	access: string;
	id: number;
	_id: number;
	username: string;
	email: string;
	name: string;
	isAdmin: boolean;
	token: string;
} */
