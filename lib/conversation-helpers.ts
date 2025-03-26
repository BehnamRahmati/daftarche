import { TConversation, TMessage } from './types'

export async function fetchConversation(url: string): Promise<{ conversation: TConversation; messages: TMessage[] }> {
    const response = await fetch(url, {
        next: { revalidate: 1 },
        cache: 'no-store',
    })
    return await response.json()
}

export async function fetchAllConversations(url: string): Promise<TConversation[]> {
    const response = await fetch(url)
    return await response.json()
}

export async function createConversation(data: {
    id: string
    recipientId: string
}): Promise<{ conversation: TConversation; status: 200 | 500 }> {
    const response = await fetch(`/api/user/${data.id}/conversations`, {
        method: 'POST',
        body: JSON.stringify({ recipientId: data.recipientId }),
    })
    return await response.json()
}

export async function createNewMessage(data: {
    message: string
    conversationId: string
    senderEmail: string
}): Promise<{ message: string; status: 200 | 500 }> {
    const response = await fetch(`/api/conversation/${data.conversationId}`, {
        method: 'PUT',
        body: JSON.stringify({ message: data.message, senderEmail: data.senderEmail }),
    })
    return await response.json()
}

export async function markMessagesRead(data: { conversationId: string; email: string }) {
    const response = await fetch(`/api/conversation/${data.conversationId}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
    })
    return await response.json()
}

export async function markMessagesReceived(data: { email: string }) {
    try {
        const response = await fetch(`/api/conversation`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        })
        return await response.json()
    } catch (e) {
        /* Handle error */
        console.warn(e)
    }
}

export async function sendPushNotification(email: string) {
    const response = await fetch(`/api/notification`, {
        method: 'POST',
        body: JSON.stringify({ email, eventType: 'received' }),
    })
    if (!response.ok) {
        return []
    }
    return await response.json()
}

export async function fetchUnreadMessages(email: string): Promise<TMessage[] | []> {
    const response = await fetch('/api/notification/messages', {
        method: 'POST',
        body: JSON.stringify({ email }),
    })
    return await response.json()
}
