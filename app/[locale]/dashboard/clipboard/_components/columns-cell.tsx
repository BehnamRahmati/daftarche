import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import { MoreHorizontal } from 'lucide-react'
import { useParams } from 'next/navigation'
import DeleteClipboard from './delete-clipboard'

export function ActionsCell({ clipboard }: { clipboard: TClipboard }) {
    const locale = useParams().locale as 'en' | 'fa'
    return (
        <div className='flex justify-center'>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className='h-8 w-8 p-0'>
                        <span className='sr-only'>Open menu</span>
                        <MoreHorizontal className='h-4 w-4' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuItem onClick={() => navigator.clipboard.writeText(clipboard.content)}>
                        {locale === 'en' ? 'Copy clipboard' : 'کپی کلیپ بورد'}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <DeleteClipboard locale={locale} clipboardId={clipboard.id} />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

import moment from 'moment'
import { TClipboard } from '@/lib/types'

export  function UpdatedCell({ updatedAt }: { updatedAt: Date }) {
    const locale = useParams().locale as 'en' | 'fa'
    const fromNow = moment(updatedAt).locale(locale).fromNow()
    return <div className='max-w-10 text-xs lg:text-sm text-start lg:text-center'>{fromNow}</div>
}
