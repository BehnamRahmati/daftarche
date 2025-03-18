'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { TDictionary } from '@/lib/types'
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
        body: JSON.stringify({ url: data.fileUrl, email: data.email }),
    })
    return await response.json()
}

export default function DownloadForm({ email, dictionary }: { email: string; dictionary: TDictionary }) {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fileUrl: '',
            email: email,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const data = await fetcher(`/api/file/proxy`, { fileUrl: values.fileUrl, email: values.email })
        console.warn(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex items-start gap-2 w-full [&>*:first-child]:flex-1'>
                <FormField
                    control={form.control}
                    name='fileUrl'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder={dictionary.file.downloadForm} {...field} />
                            </FormControl>
                            <FormDescription>
                                Copy a file&lsquo;s download link and paste here to download &apos; compress and upload to cloud.
                            </FormDescription>
                        </FormItem>
                    )}
                />
                <Button variant={'outline'} size={'icon'} className='cursor-pointer bg-sidebar-primary' type='submit'>
                    <AiOutlineCloudDownload />
                </Button>
            </form>
        </Form>
    )
}
