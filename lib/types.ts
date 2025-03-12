export type TUser = {
    id?: string
    image: string
    name: string
    email: string
    emailVerified?: Date | null
    isOnline?: boolean
    lastActive?: Date
    createdAt?: Date
    updatedAt?: Date
    conversations?: TConversation[]
    messages?: TMessage[]
    clipboards?: TClipboard[]
}

export type TClipboard = {
    id: string
    content: string
    userId: string
    user?: TUser
    createdAt: Date
    updatedAt: Date
}

export type TContact = {
    id: string
    owner: TUser
    ownerId: string
    contact: TUser
    contactId: string
    createdAt: Date
}

export type TConversation = {
    id: string
    messages: TMessage[]
    participants: TParticipants[]
    createdAt: Date
}

export type TMessage = {
    content: string
    id: string
    senderId: string
    sender: TUser
    conversationId: string
    conversation: TConversation
    createdAt: Date
    recieved: boolean
    read: string
}

export type TParticipants = {
    id: string
    user: TUser
    userId: string
    conversation: TConversation
    conversationId: string
}
