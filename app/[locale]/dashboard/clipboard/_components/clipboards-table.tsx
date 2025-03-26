'use client'

import { columns } from '@/app/[locale]/dashboard/clipboard/columns'
import DataTable from '@/components/ui/data-table'
import useClipboards from '@/hooks/use-clipboards'
import { LandingNoEntry } from '../../_components/landing'
import ClipboardList from './clipboard-list'
import ClipboardTableSkeleton from './clipboards-table-skeleton'

export default function ClipboardsTable({ id }: { id: string }) {
    const { clipboards, mutate, isLoading } = useClipboards(id)

    if (isLoading) return <ClipboardTableSkeleton />

    if (!clipboards || clipboards.length === 0)
        return <LandingNoEntry className='max-w-5xl mx-auto mt-10'>no clipboard</LandingNoEntry>

    return (
        <div className='border border-sidebar-border bg-sidebar p-2.5 rounded-lg max-w-5xl mx-auto w-full'>
            <div className='hidden md:block'>
                <DataTable columns={columns} data={clipboards} mutate={mutate} searchColumn='content' />
            </div>
            <div className='md:hidden'>
                <ClipboardList clipboards={clipboards} />
            </div>
        </div>
    )
}
