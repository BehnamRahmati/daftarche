import useFiles from '@/hooks/use-files'
import { formatFileSize } from '@/lib/file-helpers'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function percent(bytes: number) {
    const p = (bytes / 5368709120) * 100
    return p.toFixed(2)
}

function LandingUsage({ id }: { id: string }) {
    const locale = useParams().locale as 'fa' | 'en'
    const { files } = useFiles(id)
    const [usage, setUsage] = useState(0)

    useEffect(() => {
        if (files) {
            let us = 0
            for (const file of files) {
                us = us + file.size
            }
            setUsage(us)
        }
    }, [files])

    if (!files) return <p>loading</p>

    return (
        <div>
            <div className='text-base lg:text-xl font-bold'>{locale === 'fa' ? 'حجم استفاده شده :' : 'Space Usage :'}</div>
            <div className='relative border border-zinc-500 block h-8 w-full rounded-lg overflow-hidden mt-2'>
                <div
                    className='bg-amber-500 h-full transition-[width] duration-150'
                    style={{ width: `${percent(usage)}%` }}
                ></div>
                <p className='absolute top-1/2 left-1/2 z-10 transform -translate-1/2 text-center flex items-center gap-2'>
                    <span dir='ltr'>{formatFileSize(usage)}</span>
                    <span>/</span>
                    <span dir='ltr'>5 GB</span>
                </p>
            </div>
        </div>
    )
}

export default React.memo(LandingUsage)
