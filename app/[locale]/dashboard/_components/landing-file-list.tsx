'use client'

import useFiles from '@/hooks/use-files'
import { TDictionary } from '@/lib/types'
import React from 'react'
import {
    LandingList,
    LandingListBody,
    LandingListContainer,
    LandingListHeader,
    LandingListHeaderItem,
    LandingListSkleton,
    LandingNoEntry,
} from './landing'
import LandingFileItem from './landing-file-item'

type TProps = {
    id: string
    dictionary: TDictionary
}
function DashboardFileList({ id, dictionary }: TProps) {
    const { files, isLoading } = useFiles(id)

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
                    {files.slice(0, 9).map(file => (
                        <LandingFileItem key={file.id} file={file} />
                    ))}
                </LandingListBody>
            </LandingList>
        </LandingListContainer>
    )
}

export default React.memo(DashboardFileList)
