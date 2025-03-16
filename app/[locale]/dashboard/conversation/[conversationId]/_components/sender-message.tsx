import { TMessage } from '@/lib/types'
import moment from 'moment'
import { FiCheck } from 'react-icons/fi'
import { ConversationMessage, ConversationMessageContent, ConversationMessageTime } from './conversation'

export default function SenderMessage({
    message,
    isFirst,
    locale,
}: {
    message: TMessage
    isFirst: boolean
    locale: 'en' | 'fa'
}) {
    return (
        <ConversationMessage className='ltr:place-self-end rtl:flex-row-reverse'>
            <ConversationMessageContent className={`dark:bg-green-900 bg-green-100 ${isFirst && 'rounded-tr-none'}`}>
                {message.content}
                <span className='flex items-center mt-1'>
                    <span className='flex items-center rtl:flex-row-reverse mx-1'>
                        {message.read ? (
                            <FiCheck className='text-green-500 text-base -mr-2.5 ' />
                        ) : (
                            <FiCheck className='text-zinc-300 text-base -mr-2.5' />
                        )}
                        {message.received ? (
                            <FiCheck className='text-green-500 text-base' />
                        ) : (
                            <FiCheck className='text-zinc-300 text-base' />
                        )}
                    </span>
                    <ConversationMessageTime >
                        {message.createdAt && moment(message.createdAt).locale(locale).format('LT')}
                    </ConversationMessageTime>
                </span>
            </ConversationMessageContent>
            {isFirst ? (
                <span
                    className={`inline-block shrink-0 transform w-3 h-3 rtl:-translate-y-1 rtl:-translate-x-0.5 rotate-x-180 -rotate-z-90`}
                >
                    <svg
                        viewBox='0 0 8 13'
                        height='13'
                        width='8'
                        preserveAspectRatio='xMidYMid meet'
                        version='1.1'
                        x='0px'
                        y='0px'
                        enableBackground='new 0 0 8 13'
                    >
                        <title>tail-out</title>
                        <path opacity='0.13' d='M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z'></path>
                        <path
                            className='dark:fill-green-900 fill-green-100'
                            d='M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z'
                        ></path>
                    </svg>
                </span>
            ) : (
                <span className={`inline-block shrink-0 w-3 h-3`}></span>
            )}
        </ConversationMessage>
    )
}
