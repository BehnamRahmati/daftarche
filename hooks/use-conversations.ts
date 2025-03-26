import { TConversation } from '@/lib/types'
import useSWR from 'swr'

async function fetchAllConversations(url: string): Promise<TConversation[]> {
    const response = await fetch(url)
    return await response.json()
}

export default function useConversations(id: string) {
    const { data: conversations, isLoading, error, mutate } = useSWR(`/api/user/${id}/conversations`, fetchAllConversations , {refreshInterval: 10000})
    return { conversations, isLoading, error, mutate }
}
