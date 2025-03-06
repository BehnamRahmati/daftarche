export type clipboard = {
	id: string;
	content: string;
};

export type TUser = {
	id: string;
	name: string;
	email: string;
	image: string;
};

export type TMessages = {
	id: string;
	createdAt: string;
	content: string;
	senderId: string;
	conversationId: string;
	sender: TUser;
	conversation: TConversation;
};

export type TConversationParticipant = {
	id: string;
	content: string;
	userId: string;
	conversationId: string;
	user: TUser;
	conversation: TConversation;
};

export type TConversation = {
	id: string;
	createdAt: Date;
	messages: TMessages[];
	participants: TConversationParticipant[];
};

export type TStatus = 'idle' | 'loading' | 'succeeded' | 'failed';