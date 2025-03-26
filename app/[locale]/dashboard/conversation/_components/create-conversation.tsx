'use client'

import { Form } from '@/components/ui/form'
import { createConversation } from '@/lib/conversation-helpers'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
    id: z.string().uuid(),
    recipientId: z.string().uuid(),
})

export default function CreateConversation({ id, recipientId }: { id: string; recipientId: string }) {
    const { locale } = useParams()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id,
            recipientId,
        },
    })

    const router = useRouter()

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        toast('starting new conversation')
        const response = await createConversation(values)

        if (response.status === 200) {
            toast('successfull conversation')
            router.push(`/${locale}/dashboard/conversation/${response.conversation?.id}`)
        } else {
            toast('failed to start new conversation')
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <button type='submit'>{locale === 'fa' ? 'شروع یک گفتگو جدید' : 'start a new conversation'}</button>
            </form>
        </Form>
    )
}
