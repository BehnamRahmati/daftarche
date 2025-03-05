import { createNewClipboard, deleteUserClipboard, editClipboard } from '@/libs/api';
import { RootState } from '@/libs/store';
import { clipboard } from '@/types/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type TState = {
	clipboards: clipboard[] | [];
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
};

const initialState: TState = {
	clipboards: [],
	status: 'idle', // Tracks request status ('idle', 'loading', 'succeeded', 'failed')
	error: null, // Tracks error messages
};

type Tdata = {
	content: string;
	email: string;
};

export const addNewClipboardThunk = createAsyncThunk(
	'clipboards/create',
	async (data: Tdata, { rejectWithValue }) => {
		try {
			return await createNewClipboard(data);
		} catch (error) {
			return rejectWithValue('Error creating post');
		}
	}
);

export const deleteClipboardThunk = createAsyncThunk(
	'clipboards/delete',
	async (id: string, { rejectWithValue }) => {
		try {
			return await deleteUserClipboard(id);
		} catch (error) {
			return rejectWithValue('Error deleting post');
		}
	}
);

export const updateClipboardThunk = createAsyncThunk(
	'clipboards/update',
	async ({ content, id }: { content: string; id: string }, { rejectWithValue }) => {
		try {
			return await editClipboard(content, id);
		} catch (error) {
			return rejectWithValue('Error deleting post');
		}
	}
);

export const clipboardSlice = createSlice({
	name: 'clipboard',
	initialState,
	reducers: {
		initiateClipboards: (state, action) => {
			action.payload ? (state.clipboards = action.payload) : null;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(addNewClipboardThunk.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(addNewClipboardThunk.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.clipboards = [action.payload, ...state.clipboards]; // Add the new post to the list
			})
			.addCase(addNewClipboardThunk.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload as string;
			})
			// handling delete posts
			.addCase(deleteClipboardThunk.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(deleteClipboardThunk.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.clipboards = state.clipboards.filter((clipboard) => clipboard.id !== action.payload.id);
			})
			.addCase(deleteClipboardThunk.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload as string;
			})
			// handling updating posts
			.addCase(updateClipboardThunk.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(updateClipboardThunk.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.clipboards = state.clipboards.map((clipboard) =>
					clipboard.id === action.payload.id ? action.payload : clipboard
				);
			})
			.addCase(updateClipboardThunk.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload as string;
			});
	},
});

export const { initiateClipboards } = clipboardSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectClipboards = (state: RootState) => state.clipboard;

export default clipboardSlice.reducer;
