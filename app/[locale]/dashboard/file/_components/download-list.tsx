'use client'

import DataTable from '@/components/ui/data-table'
import { fetchAllFiles, formatFileSize } from '@/lib/file-helpers'
import Link from 'next/link'
import { PiClockCounterClockwiseLight, PiCloudCheckLight, PiDownload, PiWarningCircleLight } from 'react-icons/pi'
import useSWR from 'swr'
import {
    LandingList,
    LandingListBody,
    LandingListBodyItem,
    LandingListBodyRow,
    LandingListContainer,
    LandingListHeader,
    LandingListHeaderItem,
    LandingNoEntry,
} from '../../_components/landing'
import ClipboardTableSkeleton from '../../clipboard/_components/clipboards-table-skeleton'
import { columns } from '../columns'

export default function DownloadList({ email }: { email: string }) {
    const {
        data: files,
        isLoading,
        mutate,
    } = useSWR(`/api/file?email=${encodeURIComponent(email)}`, fetchAllFiles, {
        refreshInterval: 1000,
    })

    if (isLoading) return <ClipboardTableSkeleton  />

    if (!files || files.length === 0) return <LandingNoEntry className='max-w-5xl mx-auto mt-10'>no files</LandingNoEntry>

    return (
        <div className='max-w-5xl mx-auto'>
            <div className='mt-10 hidden lg:block'>
                <DataTable columns={columns} data={files} mutate={mutate} searchColumn={'filename'} />
            </div>

            <div className='mt-5 w-full lg:max-w-5xl mx-auto lg:hidden'>
                <LandingListContainer>
                    <LandingList>
                        <LandingListHeader>
                            <LandingListHeaderItem className='w-2/5'>filename</LandingListHeaderItem>
                            <LandingListHeaderItem className='w-1/5'>status</LandingListHeaderItem>
                            <LandingListHeaderItem className='w-1/5'>size</LandingListHeaderItem>
                            <LandingListHeaderItem className='w-1/5'>action</LandingListHeaderItem>
                        </LandingListHeader>
                        <LandingListBody>
                            {files.map(file => {
                                return (
                                    <LandingListBodyRow key={file.id}>
                                        <LandingListBodyItem className='w-2/5 truncate'>{file.filename}</LandingListBodyItem>

                                        <LandingListBodyItem className='w-1/5'>
                                            {file.status === 'COMPLETED' && (
                                                <span className='text-green-500'>
                                                    <PiCloudCheckLight size={25} />
                                                </span>
                                            )}
                                            {file.status === 'PENDING' && (
                                                <span className='text-amber-500'>
                                                    <PiClockCounterClockwiseLight className='animate-spin' size={25} />
                                                </span>
                                            )}
                                            {file.status === 'FAILED' && (
                                                <span className='text-red-500'>
                                                    <PiWarningCircleLight size={25} />
                                                </span>
                                            )}
                                        </LandingListBodyItem>
                                        <LandingListBodyItem className='w-1/5 text-xs'>
                                            {formatFileSize(file.size)}
                                        </LandingListBodyItem>
                                        <LandingListBodyItem className='w-1/5'>
                                            {file.status === 'COMPLETED' && (
                                                <Link download target='_blank' href={file.url}>
                                                    <PiDownload size={25} />
                                                </Link>
                                            )}
                                        </LandingListBodyItem>
                                    </LandingListBodyRow>
                                )
                            })}
                        </LandingListBody>
                    </LandingList>
                </LandingListContainer>
            </div>
        </div>
    )
}
