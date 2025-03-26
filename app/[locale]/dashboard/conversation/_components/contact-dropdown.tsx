'use client'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { deleteContact } from '@/lib/user-helpers'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { FiMoreVertical } from 'react-icons/fi'
import { toast } from 'sonner'
import { z } from 'zod'
import CreateConversation from './create-conversation'

const deleteContactForm = z.object({
    contactId: z.string().min(2).max(50),
})

export default function ContactDropdown({ contactId, recipientId }: { contactId: string; recipientId: string }) {
    const { locale } = useParams()
    const { data, status } = useSession()

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

    if (status === 'unauthenticated' || status === 'loading' || !data) return <p>loading</p>

    const userId = data.user.id

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'ghost'} size={'sm'}>
                    <FiMoreVertical />
                    <span className='sr-only'>Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side={locale === 'fa' ? 'right' : 'left'} align='end'>
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
                            <button type='submit'>{locale === 'fa' ? 'حذف مخاطب' : 'delete contact'}</button>
                        </form>
                    </Form>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <CreateConversation recipientId={recipientId} id={userId} />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
