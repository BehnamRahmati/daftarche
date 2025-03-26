import { TContact, TUser } from '@/lib/types'
import useSWR from 'swr'

export async function fetchUserContacts(url: string): Promise<{ contact: TContact; contacts: TUser[] }> {
    const response = await fetch(url)
    return response.json()
}

export default function useContacts(id: string) {
    const { data, isLoading, error, mutate } = useSWR(`/api/user/${id}/contacts`, fetchUserContacts, { refreshInterval: 10000 })
    return { contacts: data?.contacts, contact: data?.contact, isLoading, error, mutate }
}
