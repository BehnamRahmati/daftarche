'use client'

import { SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import Link from 'next/link'
import React from 'react'

export default function DashboardSidebarLink({ title, link, icon }: { title: string; link: string; icon: React.ReactNode }) {
    const { setOpenMobile } = useSidebar()
    return (
        <SidebarMenuItem >
            <SidebarMenuButton asChild>
                <Link className='flex items-center py-6 pl-3' href={link} onClick={() => setOpenMobile(false)}>
                    {icon}
                    <p className='text-base font-light'>{title}</p>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}
