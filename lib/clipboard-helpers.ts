import { TClipboard } from './types'

export async function fetchUserClipboards(url: string): Promise<TClipboard[]> {
    const response = await fetch(url)
    const clipboards = await response.json()
    return clipboards
}
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
