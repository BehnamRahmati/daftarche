import { TMessage } from '@/lib/types'
import { ConversationDate } from './conversation'
import MessageBubbleList from './massage-bubble-list'

export default function MessageListByDate({
    obj,
}: {
    obj: {
        [x: string]: TMessage[][]
    }
}) {
    return (
        <div className='flex flex-col gap-1'>
            {Object.keys(obj).map((date, index) => (
                <div key={'date' + index} className='message-bubble flex flex-col'>
                    <ConversationDate>{date}</ConversationDate>
                    {obj[date].map((messageBubbles, index) => {
                        return <MessageBubbleList key={'bblmsg' + index} messageBubbles={messageBubbles} />
                    })}
                </div>
            ))}
        </div>
    )
}
