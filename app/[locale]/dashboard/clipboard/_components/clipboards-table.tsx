'use client'

import { columns } from '@/app/[locale]/dashboard/clipboard/columns'
import DataTable from '@/components/ui/data-table'
import { fetchUserClipboards } from '@/lib/clipboard-helpers'
import { TUser } from '@/lib/types'
import useSWR from 'swr'
import ClipboardList from './clipboard-list'
import ClipboardTableSkeleton from './clipboards-table-skeleton'
import { LandingNoEntry } from '../../_components/landing'

export default function ClipboardsTable({ user }: { user: TUser }) {
    const {
        data: clipboards,
        mutate,
        isLoading,
    } = useSWR(`/api/clipboard?email=${encodeURIComponent(user.email)}`, fetchUserClipboards)

    if (isLoading) return <ClipboardTableSkeleton />

    if ( !clipboards || clipboards.length === 0) return <LandingNoEntry className='max-w-5xl mx-auto mt-10'>no clipboard</LandingNoEntry>

    return (
        <div className='border border-sidebar-border bg-sidebar p-2.5 rounded-lg'>
            <div className='hidden md:block'>
                <DataTable columns={columns} data={clipboards} mutate={mutate} searchColumn="content" />
            </div>
            <div className='md:hidden'>
                <ClipboardList clipboards={clipboards} />
            </div>
        </div>
    )
}
