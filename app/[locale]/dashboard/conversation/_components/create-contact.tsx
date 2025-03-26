'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createNewContact } from '@/lib/user-helpers'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { AiOutlineLoading } from 'react-icons/ai'
import { PiUserCirclePlus } from 'react-icons/pi'
import { z } from 'zod'

const formSchema = z.object({
    email: z.string().email(),
    id: z.string().uuid(),
})

export default function ConversationContactForm({ id }: { id: string }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { id, email: '' },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await createNewContact(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex items-center gap-2 [&>*:first-child]:flex-1'>
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input className='bg-background h-10' placeholder='enter contact email' {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button
                    type='submit'
                    disabled={form.formState.isSubmitting}
                    variant={'outline'}
                    size={'icon'}
                    className='bg-blue-700 text-accent dark:text-accent-foreground'
                >
                    {form.formState.isSubmitting ? <AiOutlineLoading className='animate-spin' /> : <PiUserCirclePlus />}
                    <span className='sr-only'>Add to clipboards</span>
                </Button>
            </form>
        </Form>
    )
}
