import { addNewMessage } from '@/libs/api';
import { RootState } from '@/libs/store';
import { TConversation, TStatus } from '@/types/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type TState = {
	chats: TConversation[];
	status: TStatus;
	error: string | null;
};

const initialState: TState = {
	chats: [],
	status: 'idle',
	error: null,
};

type TData = {
	content: string;
	conversationId: string;
	senderId: string
};


export const addNewMessageThunk = createAsyncThunk('chat/newMessage', async (data: TData, { rejectWithValue }) => {
	try {
		return await addNewMessage(data.content, data.senderId ,data.conversationId);
	} catch (error) {
		return rejectWithValue('Error creating post');
	}
});

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		initiateChat: (state, action) => {
			if (action.payload) {
				state.chats = action.payload;
			}
		},
	},
	extraReducers(builder) {
		builder // handling updating posts
			.addCase(addNewMessageThunk.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(addNewMessageThunk.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.chats = state.chats.map((chat) =>
					chat.id === action.payload.id ? action.payload : chat
				);
			})
			.addCase(addNewMessageThunk.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload as string;
			});
	},
});

export const { initiateChat } = chatSlice.actions;

export const selectChat = (state: RootState) => state.chat;

export default chatSlice.reducer;
