import { TParamsLocale } from '@/app/[locale]/_contants'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import Link from 'next/link'
import React from 'react'

type TProps = {
    locale: 'en' | 'fa'
}

export default function DashboardConversationList({ locale }: TProps) {
    return (
        <div className='rounded-xl border border-zinc-200'>
            <Table>
                <TableBody>
                    {[...new Array(4)].map((_, index) => (
                        <TableRow key={'stv' + index}>
                            <TableCell className='w-2/12'>
                                <div className='h-12 w-12 shrink-0 rounded-full bg-zinc-200'>
                                    {/* <Image src={participant.user.image} height={48} width={48} alt={participant.user.name} className='w-full h-full rounded-full' /> */}
                                </div>
                            </TableCell>
                            <TableCell className='w-3/12'>
                                <Link href={`/conversation`}>behnam</Link>
                            </TableCell>
                            <TableCell className='w-5/12 truncate'>
                                <Link href={`/conversation`}>this is the message</Link>
                            </TableCell>
                            <TableCell className='w-2/12'> 2 hours ago</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
