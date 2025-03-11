import { TConversation, TMessage } from './types'

export async function fetchConversation(url: string): Promise<{ conversation: TConversation; messages: TMessage[] }> {
    const response = await fetch(url, {
        next: { revalidate: 1 },
        cache: 'no-store',
    })
    return await response.json()
}

export async function fetchAllConversations(email: string): Promise<TConversation[]> {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/conversation?email=${encodeURIComponent(email)}`, {
        next: { revalidate: 5 },
    })
    return await response.json()
}

export async function createConversation(data: {
    senderEmail: string
    recipientId: string
}): Promise<{ message: string; status: number; conversation?: TConversation }> {
    const response = await fetch(`/api/conversation`, {
        method: 'POST',
        body: JSON.stringify(data),
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
