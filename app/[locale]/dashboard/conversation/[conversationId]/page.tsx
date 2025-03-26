import WithUser, { TWithUserProp } from '../../with-user'
import CreateMessageForm from './_components/create-message'
import MessagesList from './_components/messaged-list'
import SenderInfo from './_components/sender-info'

type TProps = TWithUserProp & {
    params: Promise<{ locale: 'en' | 'fa'; conversationId: string }>
}

async function SingleConversation({ params, user }: TProps) {
    const id = (await params).conversationId
    const locale = (await params).locale

    return (
        <div className='flex flex-col h-full gap-2'>
            <SenderInfo conversationId={id} userEmail={user.email} />
            <MessagesList user={user} conversationId={id} />
            <CreateMessageForm locale={locale} conversationId={id} senderEmail={user.email}  />
        </div> 
    )
}

export default WithUser(SingleConversation)
