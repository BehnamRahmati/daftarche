'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { AiOutlineCloudDownload } from 'react-icons/ai'
import { z } from 'zod'

const formSchema = z.object({
    fileUrl: z.string().min(2),
    email: z.string().min(2).email(),
})

async function fetcher(url: string, data: { fileUrl: string; email: string }) {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls: [data.fileUrl], email: data.email }),
    })
    return await response.json()
}

export default function DownloadForm({ email }: { email: string }) {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fileUrl: '',
            email: email,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.warn('triggered')
        const data = await fetcher(`/api/file/proxy`, { fileUrl: values.fileUrl, email: values.email })
        console.warn(data)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex items-center gap-2 w-full max-w-xl mx-auto [&>*:first-child]:flex-1'
            >
                <FormField
                    control={form.control}
                    name='fileUrl'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder='enter your file url here ...' {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button variant={'outline'} size={'icon'} className='cursor-pointer' type='submit'>
                    <AiOutlineCloudDownload />
                </Button>
            </form>
        </Form>
    )
}
