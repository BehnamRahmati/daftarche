import { TMessage } from '@/lib/types'
import moment from 'moment';
import { ConversationMessage, ConversationMessageContent, ConversationMessageTime } from './conversation';

export default function ContactMessage({ message, isFirst, locale }: { message: TMessage; isFirst: boolean; locale: 'en' | 'fa' }) {
    return (
        <ConversationMessage className='rtl:place-self-end rtl:flex-row-reverse' >
                {isFirst ? (
                    <span className={`inline-block shrink-0 transform rtl:-translate-y-1 rtl:translate-x-0.5 rotate-90 w-3 h-3`}>
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
                            <path className='fill-accent' d='M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z'></path>
                        </svg>
                    </span>
                ) : (
                    <span className={`inline-block shrink-0 w-3 h-3`}></span>
                )}

                <ConversationMessageContent className={`${isFirst && 'rounded-tl-none'}`}>
                    <span className='span'>{message.content}</span>
                        <ConversationMessageTime className='rtl:justify-items-end mt-0.5'>{message.createdAt && moment(message.createdAt).locale(locale).format("LT")}</ConversationMessageTime>
                    
                </ConversationMessageContent>
        </ConversationMessage>
    )
}
