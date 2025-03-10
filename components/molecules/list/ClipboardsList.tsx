'use client'

import { columns } from '@/app/[locale]/dashboard/clipboard/columns'
import DataTable from '@/components/ui/data-table'
import { Skeleton } from '@/components/ui/skeleton'
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { fetchUserClipboards } from '@/libs/clipboard.helpers'
import { Session } from 'next-auth'
import React from 'react'
// import { FiCopy } from 'react-icons/fi'
import useSWR from 'swr'

export default function ClipboardsList({ session, dictionary }: { session: Session; dictionary: any }) {
    if (!session || !session.user) return <p>user is not authenticated</p>
    const { user } = session

    const { data: clipboards, isLoading, error } = useSWR(user.email, fetchUserClipboards)

    if (isLoading) return <Skeleton className='h-10' />

    if (error || !clipboards?.length) return <p>no clipboards</p>


    return (
        <div className="">
            <DataTable columns={columns} data={clipboards} />
        </div>
    )

    // return (
    //     <div className="rounded-xl mt-10 border border-zinc-200">
    //         <Table className=''>
    //         <TableHeader>
    //             <TableRow  className='*:py-4'>
    //                 <TableHead  className='w-4/5 capitalize'>{dictionary.clipboard.table.columns.content}</TableHead>
    //                 <TableHead className='w-1/5 text-center capitalize'>{dictionary.clipboard.table.columns.action}</TableHead>
    //             </TableRow>
    //         </TableHeader>
    //         <TableBody>
    //             {clipboards.map(clip => (
    //                 <TableRow key={clip.id} className='*:py-4'>
    //                     <TableCell>
    //                         <p className='truncate'>{clip.content}</p>
    //                     </TableCell>
    //                     <TableCell className='text-center flex items-center justify-center'>
    //                         <button className='leading-0 cursor-pointer text-[0px]' type='button'>
    //                             copy
    //                             <FiCopy size={20} />
    //                         </button>
    //                     </TableCell>
    //                 </TableRow>
    //             ))}
    //         </TableBody>
    //     </Table>
    //     </div>
        
    // )

    // return (
    //     <div className='clipboard-list_con'>
    //         <div className='clipboard-list_heading'>
    //             <div className='w-4/5 px-5'>{dictionary.clipboard.table.columns.content}</div>
    //             <div className='w-1/5 text-center'>{dictionary.clipboard.table.columns.action}</div>
    //         </div>

    //         {clipboards.map(clip => (
    //             <div
    //                 className='clipboard-list'
    //                 key={clip.id}
    //             >
    //                 <p className='w-5/6 truncate'>{clip.content}</p>
    //                 <button
    //                     className='leading-0 w-1/6 cursor-pointer place-items-end text-[0px]'
    //                     type='button'
    //                 >
    //                     copy
    //                     <FiCopy size={20} />
    //                 </button>
    //             </div>
    //         ))}
    //     </div>
    // )
}
