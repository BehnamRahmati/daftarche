'use client'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { fetchUserClipboards } from '@/libs/clipboard.helpers'
import { Session } from 'next-auth'
import React from 'react'
import { FiCopy } from 'react-icons/fi'
import useSWR from 'swr'

export default function DashboardClipboardList({ session }: { session: Session | null }) {
    if (!session || !session.user) return <p>user is not authenticated</p>
    const { user } = session

    const { data: clipboards, isLoading, error } = useSWR(user.email, fetchUserClipboards)

    if (isLoading) return <p>is loading</p>

    if (error || !clipboards?.length) return <p>no clipboards</p>

    return (
        <div className='w-full rounded-xl border border-zinc-200'>
            <Table className='w-full'>
                <TableBody>
                    {clipboards.map(clip => (
                        <TableRow key={clip.id}>
                            <TableCell className='max-w-52 truncate'>{clip.content}</TableCell>
                            <TableCell className='w-1/6 cursor-pointer'>
                                <FiCopy size={20} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
