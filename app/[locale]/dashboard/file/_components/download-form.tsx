'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { TDictionary } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { AiOutlineCloudDownload, AiOutlineLoading } from 'react-icons/ai'
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

    const locale = (useParams().locale as 'fa') || 'en'

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
                                {locale == 'fa'
                                    ? 'لینک دانلود یک فایل را کپی و اینجا جایگذاری کنید تا آن را دانلود - فشرده سازی و در فضای ابری شخصیتان آپلود کنیم.'
                                    : " Copy a file's download link and paste here to download, compress and upload to cloud."}
                            </FormDescription>
                        </FormItem>
                    )}
                />
                <Button
                    variant={'outline'}
                    disabled={form.formState.isSubmitting}
                    size={'icon'}
                    className='cursor-pointer bg-blue-700 text-accent dark:text-accent-foreground'
                    type='submit'
                >
                    {form.formState.isSubmitting ? <AiOutlineLoading className='animate-spin' /> : <AiOutlineCloudDownload />}
                </Button>
            </form>
        </Form>
    )
}
