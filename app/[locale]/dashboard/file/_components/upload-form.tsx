'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { TDictionary } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { AiOutlineCloudUpload } from 'react-icons/ai'
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

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const formData = new FormData()
        formData.append('email', values.email)
        formData.append('file', values.file)
        const data = await fetcher(`/api/file/upload`, formData)
        console.warn(data)
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
                            <FormDescription>Select a single file to upload to cloud .</FormDescription>
                        </FormItem>
                    )}
                />
                <Button variant={'outline'} size={'icon'} type='submit' className='cursor-pointer bg-sidebar-primary'>
                    <AiOutlineCloudUpload />
                </Button>
            </form>
        </Form>
    )
}
