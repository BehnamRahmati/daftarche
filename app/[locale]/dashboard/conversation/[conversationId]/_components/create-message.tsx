'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createNewMessage } from '@/lib/conversation-helpers'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { AiOutlineLoading } from 'react-icons/ai'
import { PiPaperPlaneRightFill } from 'react-icons/pi'
import { z } from 'zod'

const formSchema = z.object({
    message: z.string().min(1),
    conversationId: z.string().uuid(),
    senderEmail: z.string().email(),
})

export default function CreateMessageForm({
    conversationId,
    senderEmail,
    locale,
    className,
}: {
    conversationId: string
    senderEmail: string
    locale: 'fa' | 'en'
    className?: string
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            conversationId,
            senderEmail,
            message: '',
        },
    })

    // top postion -> the most important math result goes here

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const response = await createNewMessage(values)
        if (response.status === 200) {
            form.setValue('message', '')
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn(
                    'flex items-center rtl:flex-row-reverse gap-2 [&>*:first-child]:flex-1 shrink-0 w-full p-2.5 lg:p-0 fixed lg:static bottom-0 left-0 bg-background',
                    className,
                )}
            >
                <FormField
                    control={form.control}
                    name='message'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    {...field}
                                    className={`bg-background ${form.formState.isSubmitting ? 'opacity-50 text-zinc-600 h-10' : 'h-10'}`}
                                    placeholder={locale === 'en' ? 'enter your message' : 'پیام خود را اینجا بنویسید'}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button
                    disabled={form.formState.isSubmitting}
                    type='submit'
                    variant={'outline'}
                    size={'icon'}
                    className='bg-blue-700 text-accent dark:text-accent-foreground h-10'
                >
                    {form.formState.isSubmitting ? <AiOutlineLoading className='animate-spin' /> : <PiPaperPlaneRightFill />}
                </Button>
            </form>
        </Form>
    )
}
