'use client'

import DataTable from '@/components/ui/data-table'
import useFiles from '@/hooks/use-files'
import React from 'react'
import {
    LandingList,
    LandingListBody,
    LandingListContainer,
    LandingListHeader,
    LandingListHeaderItem,
    LandingNoEntry,
} from '../../_components/landing'
import ClipboardTableSkeleton from '../../clipboard/_components/clipboards-table-skeleton'
import { columns } from '../columns'
import DownloadItem from "./download-item"

function DownloadList({ id }: { id: string }) {
    const { files, isLoading, mutate } = useFiles(id)

    if (isLoading) return <ClipboardTableSkeleton />

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
                            {files.map(file => (
                                <DownloadItem key={file.id} file={file} />
                            ))}
                        </LandingListBody>
                    </LandingList>
                </LandingListContainer>
            </div>
        </div>
    )
}

export default React.memo(DownloadList)
