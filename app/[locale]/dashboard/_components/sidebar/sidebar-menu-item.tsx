'use client'

import React from 'react'
import Link from 'next/link'
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'

export default function DashboardSidebarMenuItem({
    title,
    children,
    link,
}: {
    link: string
    title: string
    children: React.ReactNode
}) {
    return (
        <SidebarMenuItem >
            <SidebarMenuButton asChild className='py-6 pl-3'>
                <Link className='flex items-center' href={link}>
                    {children}
                    <p className='text-base font-light'>{title}</p>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}
