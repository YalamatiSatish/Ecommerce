import { createSlice } from '@reduxjs/toolkit';
import { UserSlice } from '../../types/user';
import { fetchUserLogInDetails, registerUser, updateUser, getUserProfile } from './thunk';

const userInfoFromlocalStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo')! )
	: null;

const initialState: UserSlice = {
	loading: 'idle',
	userloginDetails: userInfoFromlocalStorage,
	userRegister:userInfoFromlocalStorage,
	userProfile: null,
	error: {
		error_detail: '',
		error_code: '',
		status_code: '',
	},
};

export const userLoginSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		handleLogOutUser: (state ) => {
			state.userloginDetails = null
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUserLogInDetails.pending, (state) => {
			state.loading = 'loading';
		});
		builder.addCase(fetchUserLogInDetails.fulfilled, (state, { payload }) => {
			if (payload) {
				state.userloginDetails = payload;
			}
			state.loading = 'succeeded';
		});
		builder.addCase(fetchUserLogInDetails.rejected, (state, action) => {
			const payload = action.payload as UserSlice;
			if (payload) {
				state.error = payload?.error || null;
			}
			state.loading = 'failed';
		});

		builder.addCase(registerUser.pending, (state) => {
			state.loading = 'loading';
		});
		builder.addCase(registerUser.fulfilled, (state, { payload }) => {
			if (payload ) {
				state.userRegister = payload;
				state.userloginDetails = payload;
			}
			state.loading = 'succeeded';
		});
		builder.addCase(registerUser.rejected, (state, action) => {
			const payload = action.payload as UserSlice;
			if (payload) {
				state.error = payload?.error || null;
			}
			state.loading = 'failed';
		});

		builder.addCase(updateUser.pending, (state) => {
			state.loading = 'loading';
		});
		builder.addCase(updateUser.fulfilled, (state, { payload }) => {
			if (payload ) {
				state.userProfile = payload;
				state.userloginDetails = payload;

			}
			state.loading = 'succeeded';
		});
		builder.addCase(updateUser.rejected, (state, action) => {
			const payload = action.payload as UserSlice;
			if (payload) {
				state.error = payload?.error || null;
			}
			state.loading = 'failed';
		});

		builder.addCase(getUserProfile.pending, (state) => {
			state.loading = 'loading';
		});
		builder.addCase(getUserProfile.fulfilled, (state, { payload }) => {
			if (payload ) {
				state.userProfile = payload;

			}
			state.loading = 'succeeded';
		});
		builder.addCase(getUserProfile.rejected, (state, action) => {
			const payload = action.payload as UserSlice;
			if (payload) {
				state.error = payload?.error || null;
			}
			state.loading = 'failed';
		});
	},
});

export const { handleLogOutUser } = userLoginSlice.actions;

// export the slice as a reducer
export default userLoginSlice.reducer;
