export type TClipboard = {
    id: string
    content: string
    createdAt: Date
    updatedAt: Date
}

export type TUser = {
    id?: string;
    image : string;
    name:string;
    email: string;
}

export type TContact = {
    id: string;
    owner : TUser;
    ownerId : string;
    contact: TUser;
    contactId : string
}


export type TConversation =  {
    id: string;
    messages : TMessage[];
    participants : TParticipants[]
    createdAt: Date
}

export type TMessage = {
    content: string;
    id: string;
    sender : TUser
    conversation: TConversation;
    createdAt: Date
}

export type TParticipants = {
    id: string;
    user : TUser
    conversation: TConversation;
    createdAt: Date
}

export async function fetchUserClipboards(email: string) {
    const response = await fetch(`/api/clipboard?email=${encodeURIComponent(email)}`)
    const clipboards = await response.json()
    return clipboards as TClipboard[]
}



export async function fetchUserContacts(email: string): Promise<TContact[]> {
    const response = await fetch(`/api/user/${encodeURIComponent(email)}/contact`)
    return response.json()
}


export async function fetchConversations(email: string): Promise<TConversation[]> {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/conversation?email=${encodeURIComponent(email)}`)
    return await response.json()
}

export async function fetchConversation(id: string): Promise<{conversation : TConversation , messages: TMessage[]}> {
    const response = await fetch(`/api/conversation/${id}` , {
        next : { revalidate: 1} ,cache: 'no-store'
    })
    return await response.json()
}