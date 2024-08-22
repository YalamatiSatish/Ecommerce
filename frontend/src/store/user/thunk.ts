import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { getCancelToken } from '../../servies/http';
import { usersService } from '../../servies/users/users';

export const fetchUserLogInDetails = createAsyncThunk(
	'userLogin',
	async(body: { username: string; password: string }, { signal, rejectWithValue }) => {
		console.log(body, 'userlogin');
		try {
			const source = getCancelToken();
			signal.addEventListener('abort', () => {
				source.cancel();
			});
			const response = await usersService.fetchUserLogin(body, source);
			localStorage.setItem('userInfo', JSON.stringify(response.data));
			return response.data;
		} catch (err: AxiosError | unknown) {
			const error = err as AxiosError;
			return rejectWithValue(error.response?.data);
		}
	},
);

export const registerUser = createAsyncThunk(
	'userRegister',
	async(
		body: { password: string; name: string; email: string },
		{ signal, rejectWithValue },
	) => {
		try {
			const source = getCancelToken();
			signal.addEventListener('abort', () => {
				source.cancel();
			});
			const response = await usersService.registerNewuser(body, source);
			localStorage.setItem('userInfo', JSON.stringify(response.data));
			return response.data;
		} catch (err: AxiosError | unknown) {
			const error = err as AxiosError;
			return rejectWithValue(error.response?.data);
		}
	},
);

export const updateUser = createAsyncThunk(
	'userProfileUpdate',
	async(
		args: { body: { password: string; name: string; email: string }; accessToken: string },

		{ signal, rejectWithValue },
	) => {
		try {
			const source = getCancelToken();
			signal.addEventListener('abort', () => {
				source.cancel();
			});
			const response = await usersService.updateUserProfile(
				args.body,
				args.accessToken,
				source,
			);
			localStorage.setItem('userInfo', JSON.stringify(response.data));
			return response.data;
		} catch (err: AxiosError | unknown) {
			const error = err as AxiosError;
			return rejectWithValue(error.response?.data);
		}
	},
);

export const getUserProfile = createAsyncThunk(
	'getUserProfile',
	async(args: { /* body:any, */ accessToken: string }, { signal, rejectWithValue }) => {
		try {
			const source = getCancelToken();
			signal.addEventListener('abort', () => {
				source.cancel();
			});
			const response = await usersService.fetchUserProfileDetail(args.accessToken, source);
			return response ? response.data : null;
		} catch (err: AxiosError | unknown) {
			const error = err as AxiosError;
			return rejectWithValue(error.response?.data);
		}
	},
);
