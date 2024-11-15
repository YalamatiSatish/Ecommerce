import { createSlice } from '@reduxjs/toolkit';

export const getSystemTheme = (): boolean => {
	return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
		? true
		: false;
};

const initialState = {
	darkMode: getSystemTheme() /* systemTheme  */ /* false, */,
};

export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		handleModeChange: (state) => {
			state.darkMode = !state.darkMode;
		},
	},
});

export const { handleModeChange } = themeSlice.actions;

// export the slice as a reducer
export default themeSlice.reducer;
