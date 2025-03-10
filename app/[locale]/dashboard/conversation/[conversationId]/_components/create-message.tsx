'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createNewMessage } from '@/libs/clipboard.actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FiPlus } from 'react-icons/fi'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
    message: z.string().min(1),
    conversationId: z.string().uuid(),
    senderEmail : z.string().email(),
})

export default function CreateMessageForm({conversationId, senderEmail} : { conversationId : string ,senderEmail: string}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues : {
            conversationId,
            senderEmail,
            message : ''
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        toast('creating new message')
        const response = await createNewMessage(values)
        toast(response.message)
        form.setValue('message' , '')
    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex items-center gap-2 [&>*:first-child]:flex-1 py-2'>
                <FormField
                    control={form.control}
                    name='message'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type='submit' variant={'outline'} size={'icon'}>
                    <FiPlus />
                </Button>
            </form>
        </Form>
    )
}
