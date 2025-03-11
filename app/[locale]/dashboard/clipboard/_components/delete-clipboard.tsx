'use client'

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { deleteClipboard } from '@/lib/clipboard-helpers'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
    clipboardId: z.string().min(2).max(50),
})

export default function DeleteClipboard({ clipboardId, locale }: { locale: 'en' | 'fa'; clipboardId: string }) {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            clipboardId,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        toast(locale === 'en' ? 'deleting clipboard' : 'در حال حذف کلیپ بورد ...')
        const response = await deleteClipboard(values.clipboardId)
        toast(response.message)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name='clipboardId'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input hidden {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <button type='submit'>{locale === 'en' ? 'delete clipboard' : 'حذف کلیپ بورد'}</button>
            </form>
        </Form>
    )
}
