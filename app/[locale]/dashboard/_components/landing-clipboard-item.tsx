import { Button } from '@/components/ui/button'
import { TClipboard } from '@/lib/types'
import { useParams } from 'next/navigation'
import React from 'react'
import { FiCopy } from 'react-icons/fi'
import { LandingListBodyItem, LandingListBodyRow } from './landing'

function LandingClipboardItem({ clipboard }: { clipboard: TClipboard }) {
    const { locale } = useParams()
    return (
        <LandingListBodyRow key={clipboard.id}>
            <LandingListBodyItem className='w-5/6 truncate text-sm'>{clipboard.content}</LandingListBodyItem>
            <LandingListBodyItem className='w-1/6 shrink-0 cursor-pointer flex justify-center'>
                <Button
                    variant={'ghost'}
                    size={'sm'}
                    className='h-5 cursor-pointer hover:bg-transparent'
                    onClick={() => navigator.clipboard.writeText(clipboard.content)}
                    title={locale === 'en' ? 'copy' : 'کپی'}
                >
                    <FiCopy size={20} />
                </Button>
            </LandingListBodyItem>
        </LandingListBodyRow>
    )
}

export default React.memo(LandingClipboardItem)
