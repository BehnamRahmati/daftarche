'use client'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { fetchUserClipboards } from '@/lib/clipboard-helpers'
import { TUser } from '@/lib/types'
import { useParams } from 'next/navigation'
import { FiCopy } from 'react-icons/fi'
import useSWR from 'swr'

export default function DashboardClipboardList({ user }: { user: TUser }) {
    const { locale } = useParams()
    const {
        data: clipboards,
        isLoading,
        error,
    } = useSWR(`/api/clipboard?email=${encodeURIComponent(user.email)}`, fetchUserClipboards)

    if (isLoading) return <p className='p-5 text-center'>is loading</p>

    if (error || !clipboards) return <p className='p-5 text-center'>error : no clipboards</p>

    return (
        <div className='w-full px-5'>
            <Table className='w-full'>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <p className={locale === 'en' ? 'text-left' : 'text-right'}>
                                {locale === 'en' ? 'content' : 'محتوا'}
                            </p>
                        </TableHead>
                        <TableHead className='text-center'>{locale === 'en' ? 'action' : 'عملیات'}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {clipboards.length === 0 ? (
                        <p className='p-5 text-center'>{locale === 'en' ? 'no clipboards!' : 'کلیپ بوردی یافت نشد.'}</p>
                    ) : (
                        clipboards.map(clip => (
                            <TableRow key={clip.id}>
                                <TableCell className='max-w-44 lg:max-w-52 truncate'>{clip.content}</TableCell>
                                <TableCell className='w-1/6 '>
                                    <div className='cursor-pointer flex justify-center'>
                                        <Button
                                            variant={'ghost'}
                                            size={'icon'}
                                            onClick={() => navigator.clipboard.writeText(clip.content)}
                                        >
                                            <FiCopy size={20} />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
