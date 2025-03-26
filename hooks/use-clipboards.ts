import { TClipboard } from '@/lib/types'
import useSWR from 'swr'

async function fetchUserClipboards(url: string): Promise<TClipboard[]> {
    const response = await fetch(url)
    return await response.json()
}

export default function useClipboards(id: string) {
    const { data: clipboards, isLoading, error, mutate } = useSWR(`/api/user/${id}/clipboards`, fetchUserClipboards , {refreshInterval: 10000})
    return { clipboards, isLoading, error, mutate }
}
