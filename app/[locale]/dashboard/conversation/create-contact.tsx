'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createNewContact } from '@/libs/clipboard.actions'
import { TUser } from '@/libs/clipboard.helpers'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FiPlusCircle } from 'react-icons/fi'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
    email: z.string().email(),
    userEmail: z.string().email(),
})

export default function ConversationContactForm({ user }: { user: TUser }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { userEmail: user.email  , email: ''},
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        toast('creating new contact')
        const response = await createNewContact(values)
        toast(response.message)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='mt-10 flex items-center gap-2 [&>*:first-child]:flex-1'>
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button type='submit' variant={'outline'} size={'icon'}>
                    <FiPlusCircle />
                    <span className='sr-only'>Add to clipboards</span>
                </Button>
            </form>
        </Form>
    )
}
