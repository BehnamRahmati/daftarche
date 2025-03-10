'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { IoLanguageOutline } from 'react-icons/io5'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const changeLocale = (path: string, locale: string) => {
    const pathArr = path.split('/').filter(x => x)
    pathArr[0] = locale
    return pathArr.join('/')
}

export default function LocaleToggle() {
    const pathname = usePathname()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'outline'} size={'icon'}>
                    <IoLanguageOutline className='text-sm lg:text-xl' />
                    <span className='sr-only'>switch locale</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuItem>
                    <Link className='w-full' href={`/${changeLocale(pathname, 'en')}`}>English</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link className='w-full' href={`/${changeLocale(pathname, 'fa')}`}>Farsi</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
