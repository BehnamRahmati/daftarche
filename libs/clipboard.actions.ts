import { TConversation } from "./clipboard.helpers";

export async function createNewClipboard(data: { content: string; email: string }): Promise<{ message: string }> {
    const response = await fetch(`/api/clipboard`, {
        method: 'POST',
        body: JSON.stringify(data),
    })
    return await response.json()
}

export async function deleteClipboard(clipboardId: string): Promise<{ message: string }> {
    const response = await fetch(`/api/clipboard/${clipboardId}`, {
        method: 'DELETE',
    })
    return await response.json()
}

export async function deleteContact(contactId: string): Promise<{ message: string }> {
    const response = await fetch(`/api/contact/${contactId}`, {
        method: 'DELETE',
    })
    return await response.json()
}

export async function createNewContact(data: { userEmail: string; email: string }): Promise<{ message: string }> {
    const response = await fetch(`/api/user/${data.userEmail}/contact`, {
        method: 'POST',
        body: JSON.stringify(data.email),
    })
    return await response.json()
}

export async function createNewMessage(data: {
    message: string
    conversationId: string
    senderEmail: string
}): Promise<{ message: string }> {
    const response = await fetch(`/api/conversation/${data.conversationId}`, {
        method: 'PUT',
        body: JSON.stringify({ message: data.message, senderEmail: data.senderEmail }),
    })
    return await response.json()
}


export async function createConversation(data : {senderEmail: string , recipientId: string}): Promise<{message: string ; status: number ; conversation?: TConversation }> {
    const response = await fetch(`/api/conversation`, {
        method: 'POST',
        body: JSON.stringify(data),
    })
    return await response.json()
}