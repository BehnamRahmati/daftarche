import { TFile } from '@/lib/types'
import useSWR from 'swr'

export async function fetchAllFiles(url: string): Promise<TFile[]> {
    const response = await fetch(url)
    return await response.json()
}

export default function useFiles(id: string) {
    const { data: files, isLoading, error, mutate } = useSWR(`/api/user/${id}/files`, fetchAllFiles , {refreshInterval: 10000})
    return { files, isLoading, error, mutate }
}
