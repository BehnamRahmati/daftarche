'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { TDictionary } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { AiOutlineCloudUpload, AiOutlineLoading } from 'react-icons/ai'
import { z } from 'zod'

const formSchema = z.object({
    email: z.string().email(),
    file: z.any(),
})

async function fetcher(url: string, data: FormData) {
    const response = await axios.post(url, data)
    return await response.data
}

export default function UploadForm({ email, dictionary }: { email: string; dictionary: TDictionary }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email,
            file: '',
        },
    })
    const locale = useParams().locale as 'fa' || 'en'

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const formData = new FormData()
        formData.append('email', values.email)
        formData.append('file', values.file)
        await fetcher(`/api/file/upload`, formData)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex items-start gap-2 w-full [&>*:first-child]:flex-1'>
                <FormField
                    control={form.control}
                    name='file'
                    render={({ field: { onChange, value, ...field } }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    type='file'
                                    value={value?.fileName}
                                    onChange={event => {
                                        onChange(event.target.files && event.target.files[0])
                                    }}
                                    placeholder={dictionary.file.UploadForm}
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                {locale === 'fa'
                                    ? 'یک فایل را برای آپلود در فضای ابری انتخاب کنید.'
                                    : 'Select a single file to upload to cloud .'}
                            </FormDescription>
                        </FormItem>
                    )}
                />
                <Button
                    variant={'outline'}
                    size={'icon'}
                    type='submit'
                    disabled={form.formState.isSubmitting}
                    className='cursor-pointer bg-blue-700 text-accent  dark:text-accent-foreground'
                >
                    {form.formState.isSubmitting ? <AiOutlineLoading className='animate-spin' /> : <AiOutlineCloudUpload />}
                </Button>
            </form>
        </Form>
    )
}
