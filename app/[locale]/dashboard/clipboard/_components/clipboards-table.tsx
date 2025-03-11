'use client'

import { columns } from '@/app/[locale]/dashboard/clipboard/columns'
import DataTable from '@/components/ui/data-table'
import { fetchUserClipboards } from '@/lib/clipboard-helpers'
import { TUser } from '@/lib/types'
import useSWR from 'swr'
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
        <div className='mt-10'>
            <DataTable columns={columns} data={clipboards} mutate={mutate} />
        </div>
    )
}
