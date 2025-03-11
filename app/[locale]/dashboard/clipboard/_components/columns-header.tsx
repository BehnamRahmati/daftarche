'use client'

import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import { useParams } from 'next/navigation'

export function ContentHeader() {
    const { locale } = useParams()
    return (
        <p className={locale === 'en' ? 'text-left max-w-32 lg:max-w-5/6' : 'text-right max-w-32 lg:max-w-5/6'}>
            {locale === 'en' ? 'content' : 'محتوا'}
        </p>
    )
}

export function UpdateHeader({onClick}: {onClick: () => void}) {
    const { locale } = useParams()
    return (
        <div className='flex justify-end lg:justify-center max-w-10'>
            <Button
                variant='ghost'
                className='text-2xs lg:text-base'
                onClick={onClick}
            >
                {locale === 'en' ? 'last update' : 'بروزرسانی شده در'}
                <ArrowUpDown className='lg:ml-1 h-3 w-3 lg:h-4 lg:w-4' />
            </Button>
        </div>
    )
}

export function ActionsHeader() {
    const { locale } = useParams()
    return <div className='text-center text-xs lg:text-base'>{locale === 'en' ? 'Actions' : 'عملیات'}</div>
}
