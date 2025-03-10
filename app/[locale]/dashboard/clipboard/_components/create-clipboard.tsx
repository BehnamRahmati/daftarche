'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createNewClipboard } from '@/libs/clipboard.actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FiClipboard } from 'react-icons/fi'
import { RiPlayListAddLine } from 'react-icons/ri'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
    content: z.string().min(2).max(500),
    email: z.string().min(2).max(100),
})

export default function CreateClipboard({ email }: { email: string }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email,
            content: ""
        },
    })

    const handlePaste = async () => {
        const clipboardVal = await navigator.clipboard.readText()
        form.setValue('content', clipboardVal)
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        toast('creating new clipboard')
        const response = await createNewClipboard(values)
        toast(response.message)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex items-center gap-2 mt-10 [&>*:first-child]:flex-1'>
                <FormField
                    control={form.control}
                    name='content'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input hidden {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button type='button' variant={'outline'} size={'icon'} onClick={() => handlePaste()}>
                    <FiClipboard />
                    <span className='sr-only'>paste from clipboard</span>
                </Button>

                <Button type='submit' variant={'outline'} size={'icon'}>
                    <RiPlayListAddLine />
                    <span className='sr-only'>Add to clipboards</span>
                </Button>
            </form>
        </Form>
    )
}
