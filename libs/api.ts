import { clipboard, TConversation } from '@/types/api';


// clipboard api
export async function createNewClipboard(data: { content: string; email: string }) {
	const response = await fetch(`/api/clipboard`, {
		method: 'POST',
		body: JSON.stringify(data),
	});
	const clipboards = await response.json();
	return clipboards as clipboard;
}

export async function fetchUserClipboards(email: string) {
	const response = await fetch(`/api/clipboard?email=${encodeURIComponent(email)}`);
	const clipboards = await response.json();
	return clipboards as clipboard[];
}

export async function serverFetchUserClipboards(email: string) {
	const response = await fetch(
		`${process.env.NEXTAUTH_URL}/api/clipboard?email=${encodeURIComponent(email)}`
	);
	const clipboards = await response.json();
	return clipboards as clipboard[];
}

export async function deleteUserClipboard(id: string) {
	const response = await fetch(`/api/clipboard/${id}`, {
		method: 'DELETE',
	});
	const clipboard = await response.json();
	return clipboard as clipboard;
}

export async function editClipboard(content: string, id: string) {
	const response = await fetch(`/api/clipboard/${id}`, {
		method: 'PUT',
		body: JSON.stringify(content),
	});
	const clipboard = await response.json();
	return clipboard as clipboard;
}


// user api
export async function serverFetchUser(email: string) {
	const response = await fetch(`${process.env.NEXTAUTH_URL}/api/user?email=${encodeURIComponent(email)}`);
	const user = await response.json();
	return user;
}

// conversation api

export async function fetchUsetConversations(email: string) {
	const response = await fetch(`/api/conversation?email=${encodeURIComponent(email)}`);
	const conversations = await response.json();
	return conversations as TConversation[];
}

export async function ServerfetchUsetConversations(email: string) {
	const response = await fetch(`${process.env.NEXTAUTH_URL}/api/conversation?email=${encodeURIComponent(email)}`);
	const conversations = await response.json();
	return conversations as TConversation[];
}

export async function createnewConversation(senderId: string, recipientId: string, content:string) {
	const response = await fetch(`/api/conversation`, {
		method: 'POST',
		body: JSON.stringify({senderId, recipientId, content}),
	});
	const conversation = await response.json();
	return conversation as TConversation;
}

export async function addNewMessage(content: string ,senderId : string,  conversationId: string) {
	const response = await fetch(`/api/conversation/${conversationId}`, {
		method: 'PUT',
		body: JSON.stringify({content, senderId}),
	});
	const conversation = await response.json();
	return conversation as TConversation;
}