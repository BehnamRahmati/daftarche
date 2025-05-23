import { TContact, TUser } from './types'

export async function fetchUserContacts(url: string): Promise<{ contact: TContact; contacts: TUser[] }> {
    const response = await fetch(url)
    return response.json()
}

export async function markUserOnlinePeriodically(id: string) {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/user/${id}`, {
        method: 'PUT',
        next: { revalidate: 600 },
    })
    return await response.json()
}

export async function fetchUser(url: string): Promise<TUser> {
    const response = await fetch(url)
    return await response.json()
}

export async function createNewContact(data: { id: string; email: string }): Promise<{ message: string }> {
    const response = await fetch(`/api/user/${data.id}/contacts`, {
        method: 'POST',
        body: JSON.stringify(data.email),
    })
    return await response.json()
}

export async function deleteContact(contactId: string): Promise<{ message: string }> {
    const response = await fetch(`/api/contact/${contactId}`, {
        method: 'DELETE',
    })
    return await response.json()
}
