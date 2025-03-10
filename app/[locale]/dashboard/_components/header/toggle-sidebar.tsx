'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { LuPanelLeft, LuPanelRight } from 'react-icons/lu'
import { useSidebar } from '@/components/ui/sidebar'

export default function SidebarToggle() {
    const { state, toggleSidebar } = useSidebar()
    return (
        <Button variant={'outline'} size={'icon'} onClick={toggleSidebar}>
            {state === 'expanded' ? <LuPanelLeft /> : <LuPanelRight />}
            <span className='sr-only'>Toggle Sidebar</span>
        </Button>
    )
}
