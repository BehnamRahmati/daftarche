'use client'

import DataTable from '@/components/ui/data-table'
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
} from '../../_components/landing'
import { columns } from '../columns'
import { fetchAllFiles, formatFileSize } from '@/lib/file-helpers'
import ClipboardTableSkeleton from '../../clipboard/_components/clipboards-table-skeleton'



export default function DownloadList({ email }: { email: string }) {
    const {
        data: files,
        isLoading,
        mutate,
    } = useSWR(`/api/file?email=${encodeURIComponent(email)}`, fetchAllFiles, {
        refreshInterval: 1000,
    })

    if (isLoading || !files) return <ClipboardTableSkeleton />

    return (
        <>
            <div className='mt-5 hidden lg:block'>
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
                            {files.length !== 0 ? (
                                files.map(file => {
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
                                })
                            ) : (
                                <p>no files</p>
                            )}
                        </LandingListBody>
                    </LandingList>
                </LandingListContainer>
            </div>
        </>
    )
}
