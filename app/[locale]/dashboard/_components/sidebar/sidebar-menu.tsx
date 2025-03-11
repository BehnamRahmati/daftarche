import { SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu } from '@/components/ui/sidebar'
import React from 'react'

type TProp = {
    children: React.ReactNode
    locale: 'fa' | 'en'
}

export default function DashboardSidebarMenu({ children, locale }: TProp) {
    return (
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>{locale === 'en' ? 'Projects' : 'پروژه ها'}</SidebarGroupLabel>
                <SidebarMenu>{children}</SidebarMenu>
            </SidebarGroup>
        </SidebarContent>
    )
}
