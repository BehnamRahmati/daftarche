import { RootState } from "@/libs/store";
import { TUser } from "@/types/api";
import { createSlice } from "@reduxjs/toolkit";

type TState = {
    user: TUser | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

const initialState: TState = {
	user: null,
	status: 'idle', // Tracks request status ('idle', 'loading', 'succeeded', 'failed')
	error: null, // Tracks error messages
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		initiateUser: (state, action) => {
			action.payload ? state.user = action.payload : null;
		},
	},
});

export const { initiateUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
