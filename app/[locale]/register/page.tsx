import RegisterForm from './register-form'

export default function RegisterPage() {
    return (
        <div className='h-dvh w-dvw overflow-hidden relative'>
            <div className='h-1/2 w-full bg-zinc-100'></div>
            <div className='h-1/2 w-full bg-black'></div>
            <RegisterForm />
        </div>
    )
}
