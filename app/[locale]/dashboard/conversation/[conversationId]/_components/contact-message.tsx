import { TMessage } from '@/lib/types'

export default function ContactMessage({ message, isFirst }: { message: TMessage; isFirst: boolean }) {
    return (
        <div key={message.id} className={`shrink-0 mt-1 rtl:place-items-end`}>
            <div className='w-fit flex rtl:flex-row-reverse'>
                {isFirst ? (
                    <span className={`block transform rtl:-translate-y-1 rtl:translate-x-0.5 rotate-90 w-3 h-3`}>
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
                    <span className={`block w-3 h-3`}></span>
                )}

                <p
                    className={`p-2 bg-accent shadow-sm shrink-0 rounded-lg ${isFirst && 'rounded-tl-none'}`}
                >
                    {message.content}
                </p>
            </div>
        </div>
    )
}
