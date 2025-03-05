import { RootState } from '@/libs/store';
import { createSlice } from '@reduxjs/toolkit';

type TState = {
	value: 'en' | 'fa';
};

const initialState: TState = {
	value: 'en',
};

export const langSlice = createSlice({
	name: 'lang',
	initialState,
	reducers: {
		initiateLang: (state, action) => {
			action.payload ? (state.value = action.payload) : null;
		},
	},
});

export const { initiateLang } = langSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLang = (state: RootState) => state.lang.value;

export default langSlice.reducer;