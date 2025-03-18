'use client'

import { fetchAllFiles, formatFileSize } from '@/lib/file-helpers'
import { TDictionary, TUser } from '@/lib/types'
import Link from 'next/link'
import React from 'react'
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
    LandingListSkleton,
    LandingNoEntry,
} from './landing'

type TProps = {
    user: TUser
    dictionary: TDictionary
}
function DashboardFileList({ user, dictionary }: TProps) {
    const { data: files, isLoading } = useSWR(`/api/file?email=${encodeURIComponent(user.email)}`, fetchAllFiles, {
        refreshInterval: 30000,
    })

    if (isLoading) return <LandingListSkleton count={4} section='files' />

    if (!files || files.length === 0) return <LandingNoEntry>{dictionary.dashboard.files.noEntry}</LandingNoEntry>

    return (
        <LandingListContainer className='lg:overflow-y-auto no-scrollbar'>
            <LandingList>
                <LandingListHeader>
                    <LandingListHeaderItem className='w-2/6'>{dictionary.dashboard.filesList.filename}</LandingListHeaderItem>
                    <LandingListHeaderItem className='w-1/6'>{dictionary.dashboard.filesList.type}</LandingListHeaderItem>
                    <LandingListHeaderItem className='w-1/6'>{dictionary.dashboard.filesList.status}</LandingListHeaderItem>
                    <LandingListHeaderItem className='w-1/6'>{dictionary.dashboard.filesList.size}</LandingListHeaderItem>
                    <LandingListHeaderItem className='w-1/6'>{dictionary.dashboard.filesList.action}</LandingListHeaderItem>
                </LandingListHeader>
                <LandingListBody>
                    {files.slice(0, 9).map(file => {
                        return (
                            <LandingListBodyRow key={file.id}>
                                <LandingListBodyItem className='w-2/6 truncate'>{file.filename}</LandingListBodyItem>
                                <LandingListBodyItem className='w-1/6 truncate'>{file.type}</LandingListBodyItem>

                                <LandingListBodyItem className='w-1/6'>
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
                                <LandingListBodyItem className='w-1/6 text-xs'>{formatFileSize(file.size)}</LandingListBodyItem>
                                <LandingListBodyItem className='w-1/6'>
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
    )
}

export default React.memo(DashboardFileList)
