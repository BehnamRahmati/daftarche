import { TMessage } from '@/lib/types'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import ContactMessage from './contact-message'
import SenderMessage from './sender-message'

export default function MessageBubbleList({ messageBubbles }: { messageBubbles: TMessage[] }) {
    const { data: session } = useSession()
    const locale = useParams().locale as 'fa' | 'en'
    return (
        <div>
            {messageBubbles.map(message => {
                const sender = message.sender.email === session?.user?.email
                if (sender) {
                    return (
                        <SenderMessage
                            key={message.id}
                            isFirst={messageBubbles[0].id === message.id}
                            message={message}
                            locale={locale}
                        />
                    )
                }
                return (
                    <ContactMessage
                        key={message.id}
                        isFirst={messageBubbles[0].id === message.id}
                        message={message}
                        locale={locale}
                    />
                )
            })}
        </div>
    )
}
