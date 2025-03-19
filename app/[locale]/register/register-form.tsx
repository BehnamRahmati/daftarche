'use client'

import GoogleSignInButton from '@/components/google-signin-button'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { redirect, useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// * form schema
const formSchema = z.object({
    name: z.string().min(5),
    password: z.string().min(8),
    email: z.string().min(10).email(),
})

export default function RegisterForm() {
    const { data: session } = useSession()
    const locale = useParams().locale as 'fa' | 'en'
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            password: '',
            email: '',
        },
    })

    if (session) {
        redirect('/dashboard')
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const response = await axios.post('/api/user/register' , values)
        console.warn(response)
        if(response.status === 200) {
            router.replace(`/${locale}/login`)
        }
    }

    return (
        <div className='fixed top-1/2 left-1/2 z-20 transform -translate-1/2 bg-background p-2.5 border border-sidebar w-11/12 md:w-sm py-10 rounded-lg'>
            <h1 className='text-center text-base lg:text-lg mb-10'>
                Welcome to <span className='text-3xl md:text-4xl font-bold'> Daftarche</span>
            </h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2.5 md:w-xs mx-auto'>
                    <FormField
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>name</FormLabel>
                                <FormControl>
                                    <Input type='text' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>email</FormLabel>
                                <FormControl>
                                    <Input type='text' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>password</FormLabel>
                                <FormControl>
                                    <Input type='text' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button variant={'outline'} type='submit' className='cursor-pointer bg-sidebar-primary'>
                        create new account
                    </Button>
                </form>
            </Form>

            <div className='flex items-center md:w-xs mx-auto'>
                <div className='flex-1 border-b border-accent'></div>
                <div className='w-10 py-5 text-center'>OR</div>
                <div className='flex-1 border-b border-accent'></div>
            </div>

            <div className='mb-5 flex flex-col items-center justify-center gap-2.5'>
                <div className='text-sm'>
                    <span> already have an account ?</span>
                    <Link href={`/${locale}/login`} className='text-sidebar-primary dark:text-blue-500 ml-2'>
                        log in
                    </Link>
                </div>
                <div className='text-sm'>
                    <span> forgot your password ?</span>
                    <Link href={'/'} className='text-sidebar-primary dark:text-blue-500 ml-2'>
                        new password
                    </Link>
                </div>
            </div>

            <GoogleSignInButton />
        </div>
    )
}
