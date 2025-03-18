'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createNewMessage } from '@/lib/conversation-helpers'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { PiPaperPlaneRightFill } from 'react-icons/pi'
import { toast } from 'sonner'
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
}: {
    conversationId: string
    senderEmail: string
    locale: 'fa' | 'en'
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            conversationId,
            senderEmail,
            message: '',
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        toast('creating new message')
        const response = await createNewMessage(values)
        toast(response.message)
        form.setValue('message', '')
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex items-center rtl:flex-row-reverse gap-2 [&>*:first-child]:flex-1 shrink-0 w-full p-2.5 lg:p-0 fixed lg:static bottom-0 left-0 bg-background'
            >
                <FormField
                    control={form.control}
                    name='message'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder={locale === 'en' ? 'enter your message' : 'پیام خود را اینجا بنویسید'}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type='submit' variant={'outline'} size={'icon'} className='bg-sidebar-primary'>
                    <PiPaperPlaneRightFill />
                </Button>
            </form>
        </Form>
    )
}
