'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

export default function BackButton({ locale }: { locale: 'en' | 'fa' }) {
    const router = useRouter()
    return (
        <Button variant={'outline'} size={'icon'} onClick={() => router.back()}>
            {locale === 'fa' ? <FiArrowRight /> : <FiArrowLeft />}
            <span className='sr-only'>go back</span>
        </Button>
    )
}
