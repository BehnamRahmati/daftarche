'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { FiBell } from 'react-icons/fi'

export default function NotificationToggle() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'outline'} size={'icon'}>
                    <FiBell />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>this is a message</DropdownMenuItem>
                <DropdownMenuItem>this is another message</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
