'use client'

import { ColumnDef } from '@tanstack/react-table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import DeleteClipboard from './_components/delete-clipboard'

import moment from 'moment'
import { usePathname } from 'next/navigation'

export type Clipboards = {
    id: string
    content: string
    createdAt: Date
    updatedAt: Date
}

const getLocale = () => {
    return usePathname()
        .split('/')
        .filter(x => x)[0] as 'en' | 'fa'
}


export const columns: ColumnDef<Clipboards>[] = [
    {
        accessorKey: 'content',
        header: () => {
            const locale = getLocale()
            return (
                <p className={locale === 'en' ? 'text-left' : 'text-right'}>{locale === 'en' ? 'content' : 'محتوا'}</p>
            )
        },
        cell({ row }) {
            const clipboard = row.original
            return <div className='max-w-5/6 truncate'>{clipboard.content}</div>
        },
    },

    {
        accessorKey: 'updatedAt',
        cell({ row }) {
            const locale = getLocale()
            const fromNow = moment(row.original.updatedAt).locale(locale).fromNow()
            return <div className='text-center'>{fromNow}</div>
        },
        header: ({ column }) => {
            const locale = getLocale()
            return (
                <div className='flex justify-center'>
                    <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        {locale === 'en' ? 'last update' : 'بروزرسانی شده در'}
                        <ArrowUpDown className='ml-1 h-4 w-4' />
                    </Button>
                </div>
            )
        },
    },
    {
        accessorKey: 'actions',
        header() {
            const locale = getLocale()
            return <div className='text-center'>{locale === 'en' ? 'Actions' : 'عملیات'}</div>
        },
        id: 'actions',
        cell({ row }) {
            const clipboard = row.original
            const locale = getLocale()
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
        },
    },
]
