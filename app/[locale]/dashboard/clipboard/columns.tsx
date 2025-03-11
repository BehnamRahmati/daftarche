'use client'

import { ColumnDef } from '@tanstack/react-table'

import { ActionsCell, UpdatedCell } from './_components/columns-cell'
import { ActionsHeader, ContentHeader, UpdateHeader } from './_components/columns-header'

export type Clipboards = {
    id: string
    content: string
    createdAt: Date
    updatedAt: Date
}

export const columns: ColumnDef<Clipboards>[] = [
    {
        accessorKey: 'content',
        header: () => {
            return <ContentHeader />
        },
        cell({ row }) {
            const clipboard = row.original
            return <div className='max-w-32 text-xs lg:text-base lg:max-w-5/6 truncate'>{clipboard.content}</div>
        },
    },

    {
        accessorKey: 'updatedAt',
        cell({ row }) {
            return <UpdatedCell updatedAt={row.original.updatedAt} />
        },
        header: ({ column }) => {
            return <UpdateHeader onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} />
        },
    },
    {
        accessorKey: 'actions',
        header() {
            return <ActionsHeader />
        },
        id: 'actions',
        cell({ row }) {
            const clipboard = row.original

            return <ActionsCell clipboard={clipboard} />
        },
    },
]
