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
    received: boolean
    read: string
}

export type TParticipants = {
    id: string
    user: TUser
    userId: string
    conversation: TConversation
    conversationId: string
}

export type TFile = {
    id: string
    url: string
    filename: string // Original filename
    type: 'ARCHIVE' | 'IMAGE' | 'OTHER' | 'VIDEO' // File category
    size: number // File size in bytes
    mimeType: string // MIME type
    status: 'PENDING' | 'COMPLETED' | 'FAILED'
    virusScanStatus: string // Could be enum if needed
    userId: string
    user: TUser
    createdAt: Date
    updatedAt: Date
    deletedAt: Date // For soft deletion
    downloads: number

    // Optional metadata fields
    width?: number // For images/videos
    height?: number // For images/videos
    duration?: number // For audio/video
    thumbnailUrl?: string // For media previews
}

export type TDictionary = {
    home: {
        title: string
    }
    file: {
        title: string
    }
    clipboard: {
        title: string
        table: {
            columns: {
                content: string
                action: string
                updatedAt: string
            }
        }
        form: {
            content: string
        }
    }
    dashboard: {
        title: string
        clipboard: {
            title: string
            noEntry: string
        }
        conversation: {
            title: string
            noEntry: string
        }
        contacts: {
            title: string
            noEntry: string
        }
        files: {
            title: string
            noEntry: string
        }
        conversationList: {
            avatar: string
            name: string
            message: string
            visit: string
        }
        clipboardList: {
            content: string
            action: string
        }
    }
    conversation: {
        title: string
    }
}
