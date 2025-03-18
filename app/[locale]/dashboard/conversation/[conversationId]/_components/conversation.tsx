import { cn } from '@/lib/utils'

function ConversationContainer({ className, ...props }: React.ComponentProps<'div'>) {
    return <div className={cn('flex-1 rounded-lg border border-sidebar-border bg-zinc-300 dark:bg-sidebar bg-[url("/static/chatbackground.png")] dark:bg-[url("/static/dark-chat-bg.jpg")] p-0.5 pb-2.5', className)} {...props} />
}

function ConversationList({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            className={cn(
                'flex flex-col h-[calc(100dvh-13rem)] lg:h-full max-h-[calc(100%-13)] lg:max-h-[calc(100dvh-14rem)] gap-1 overflow-x-hidden overflow-y-auto no-scrollbar',
                className,
            )}
            {...props}
        />
    )
}

function ConversationDate({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            className={cn('bg-accent text-xs lg:text-sm mx-auto w-fit py-1 rtl:pt-2 px-2.5 rounded-lg mt-10', className)}
            {...props}
        />
    )
}

function ConversationMessage({ className, ...props }: React.ComponentProps<'div'>) {
    return <div className={cn('shrink-0 mt-2 w-fit flex', className)} {...props} />
}

function ConversationMessageContent({ className, ...props }: React.ComponentProps<'p'>) {
    return <p className={cn('p-2 pb-1 flex flex-col bg-accent flex-1 shadow-sm shrink-0 rounded-lg', className)} {...props} />
}

function ConversationMessageTime({ className, ...props }: React.ComponentProps<'span'>) {
    return <span className={cn('inline-block text-[10px] text-zinc-500 dark:text-zinc-300', className)} {...props} />
}


export { ConversationContainer, ConversationDate, ConversationList, ConversationMessage,ConversationMessageContent,ConversationMessageTime }
