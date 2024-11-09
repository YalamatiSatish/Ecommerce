import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	darkMode: false,
};

export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		/* handleLogOutUser: (state) => {
			state.userloginDetails = null;
		}, */
		handleModeChange: (state) => {
			state.darkMode = !state.darkMode;
		},
	},
});

export const { handleModeChange } = themeSlice.actions;

// export the slice as a reducer
export default themeSlice.reducer;
