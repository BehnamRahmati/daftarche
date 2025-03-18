'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'
import { z } from 'zod'
const formSchema = z.object({
    password: z.string(),
    email: z.string().email(),
})

export default function LoginForm() {
    const { data: session } = useSession()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: '',
            email: '',
        },
    })

    if (session) {
        redirect('/dashboard')
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.warn(values)
    }

    return (
        <div className='fixed top-1/2 left-1/2 z-20 transform -translate-1/2 bg-background p-2.5 border border-sidebar w-11/12 md:w-sm py-10 rounded-lg'>
            <h1 className='text-center text-base lg:text-lg mb-10'>
                Welcome to <span className='text-3xl md:text-4xl font-bold'> Daftarche</span>
            </h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2.5 md:w-xs mx-auto'>
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
                    <Button variant={'outline'} type='submit' disabled className='bg-sidebar-primary'>
                        log in
                    </Button>
                </form>
            </Form>

            <div className='flex items-center'>
                <div className='flex-1 border-b border-accent'></div>
                <div className='w-10 py-5 text-center'>OR</div>
                <div className='flex-1 border-b border-accent'></div>
            </div>

            <div className='mb-5 flex flex-col items-center justify-center gap-2.5'>
                <div className='text-sm'>
                    <span> don&lsquo;t have an account ?</span>
                    <Link href={'/'} className='text-sidebar-primary dark:text-blue-500 ml-2'>register</Link>
                </div>
                <div className='text-sm'>
                    <span> forgot your password ?</span>
                    <Link href={'/'} className='text-sidebar-primary dark:text-blue-500 ml-2'>new password</Link>
                </div>
            </div>

            <Button
                variant={'outline'}
                type='button'
                size={'lg'}
                onClick={() => signIn('google')}
                className='flex items-center gap-2.5 mx-auto'
            >
                <FcGoogle />
                Sign in with Google
            </Button>
        </div>
    )
}
