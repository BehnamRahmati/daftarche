'use client'

import { columns } from '@/app/[locale]/dashboard/clipboard/columns'
import DataTable from '@/components/ui/data-table'
import { fetchUserClipboards } from '@/lib/clipboard-helpers'
import { TUser } from '@/lib/types'
import useSWR from 'swr'
import ClipboardList from './clipboard-list'
import ClipboardTableSkeleton from './clipboards-table-skeleton'

export default function ClipboardsTable({ user }: { user: TUser }) {
    const {
        data: clipboards,
        mutate,
        isLoading,
        error,
    } = useSWR(`/api/clipboard?email=${encodeURIComponent(user.email)}`, fetchUserClipboards)

    if (isLoading) return <ClipboardTableSkeleton />

    if (error || !clipboards) return <p>no clipboards</p>

    return (
        <div className='mt-2.5 border border-sidebar-border bg-sidebar p-2.5 rounded-lg'>
            <div className='hidden md:block'>
                <DataTable columns={columns} data={clipboards} mutate={mutate} searchColumn="content" />
            </div>
            <div className='md:hidden'>
                <ClipboardList clipboards={clipboards} />
            </div>
        </div>
    )
}
