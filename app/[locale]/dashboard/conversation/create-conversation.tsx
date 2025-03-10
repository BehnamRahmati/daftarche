'use client';


import { Form } from '@/components/ui/form';
import { createConversation } from '@/libs/clipboard.actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
    senderEmail: z.string().email(),
    recipientId: z.string().uuid(),
})

export default function CreateConversation({senderEmail , recipientId}:{senderEmail: string; recipientId: string}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues : {
            senderEmail,
            recipientId
        }
    })

    const router = useRouter()


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        toast('starting new conversation')
        const response = await createConversation(values)
        if(response.status === 200) {
            toast('successfull conversation')
            router.push(`/dashboard/conversation/${response.conversation?.id}`)
        }

        toast('failed to start new conversation')
        
    }
  return (
    
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <button type='submit'>start a conversation</button>
        </form>
    </Form>
  )
}
