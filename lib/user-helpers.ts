import { TContact, TUser } from './types'

export async function fetchUserContacts(url: string): Promise<{ contact: TContact; contacts: TUser[] }> {
    const response = await fetch(url)
    return response.json()
}

export async function markUserOnlinePeriodically(email: string) {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/user/${encodeURIComponent(email)}`, {
        method: 'PUT',
        next: { revalidate: 60 },
    })
    return await response.json()
}

export async function fetchUser(url: string): Promise<{ messsage: string; user: TUser }> {
    const response = await fetch(url)
    return await response.json()
}

export async function createNewContact(data: { userEmail: string; email: string }): Promise<{ message: string }> {
    const response = await fetch(`/api/user/${data.userEmail}/contact`, {
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
