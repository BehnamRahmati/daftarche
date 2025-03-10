import WithUser, { TWithUserProp } from '../../with-user'
import CreateMessageForm from './_components/create-message'
import MessagesList from './_components/messaged-list'

type TProps = TWithUserProp & {
    params: Promise<{ locale: 'en' | 'fa'; conversationId: string }>
}

async function SingleConversation({ params, user }: TProps) {
    const id = (await params).conversationId

    return (
        <div className=''>
            <MessagesList user={user} conversationId={id} />
            <CreateMessageForm conversationId={id} senderEmail={user.email} />
        </div>
    )
}

export default WithUser(SingleConversation)
