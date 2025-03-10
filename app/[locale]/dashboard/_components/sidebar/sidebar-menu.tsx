import { SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu } from '@/components/ui/sidebar'
import React from 'react'
import DashboardSidebarMenuItem from './sidebar-menu-item'

type TProp = {
    links: {
        title: string
        link: string
        icon: React.ReactNode
    }[]
}

export default function DashboardSidebarMenu({ links }: TProp) {
    return (
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Projects</SidebarGroupLabel>
                <SidebarMenu>
                    {links.map(link => (
                        <DashboardSidebarMenuItem link={link.link} title={link.title} key={link.title} children={link.icon} />
                    ))}
                </SidebarMenu>
            </SidebarGroup>
        </SidebarContent>
    )
}
