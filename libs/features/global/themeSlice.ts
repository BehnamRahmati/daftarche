import { RootState } from '@/libs/store';
import { createSlice } from '@reduxjs/toolkit';

type TState = {
	value: 'light' | 'dark';
};

const initialState: TState = {
	value: 'light',
};

export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		toggleTheme: (state) => {
			state.value === 'dark' ? (state.value = 'light') : (state.value = 'dark');
			localStorage.setItem('theme', state.value);
			document.documentElement.classList.toggle(
				'dark',
				localStorage.theme === 'dark' ||
					(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
			);
		},
		initiateTheme: (state, action) => {
			action.payload ? (state.value = action.payload) : null;
		},
	},
});

export const { toggleTheme, initiateTheme } = themeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTheme = (state: RootState) => state.theme.value;

export default themeSlice.reducer;
