'use client'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { deleteContact } from '@/libs/clipboard.actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FiMoreVertical } from 'react-icons/fi'
import { toast } from 'sonner'
import { z } from 'zod'
import CreateConversation from './create-conversation'
import { TUser } from '@/libs/clipboard.helpers'

const deleteContactForm = z.object({
    contactId: z.string().min(2).max(50),
})

export default function ContactDropdown({ contactId , user , recipientId }: { contactId: string , user : TUser , recipientId: string}) {
    const form = useForm<z.infer<typeof deleteContactForm>>({
        resolver: zodResolver(deleteContactForm),
        defaultValues: {
            contactId,
        },
    })

    async function onSubmit(values: z.infer<typeof deleteContactForm>) {
        toast('deleting contact')
        const response = await deleteContact(values.contactId)
        toast(response.message)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'ghost'} size={'sm'}>
                    <FiMoreVertical />
                    <span className='sr-only'>Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuItem>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name='contactId'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input hidden {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <button type='submit'>delete contact</button>
                        </form>
                    </Form>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <CreateConversation recipientId={recipientId} senderEmail={user.email}  />
                    </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
