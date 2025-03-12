'use client'

import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

export default function BackButton() {
    const router = useRouter()
    const locale = useParams().locale as "fa" | "en"
    return (
        <Button variant={'outline'} size={'icon'} onClick={() => router.back()}>
            {locale === 'fa' ? <FiArrowRight /> : <FiArrowLeft />}
            <span className='sr-only'>go back</span>
        </Button>
    )
}
