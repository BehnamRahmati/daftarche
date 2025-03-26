'use client'

import useClipboards from '@/hooks/use-clipboards'
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
import LandingClipboardItem from './landing-clipboard-item'

function DashboardClipboardList({ id, dictionary }: { id: string; dictionary: TDictionary }) {
    const { clipboards, isLoading, error } = useClipboards(id)

    if (isLoading) return <LandingListSkleton count={15} section='clipboards' />

    if (error) return <p className='p-2.5 text-center'>error : no clipboards</p>

    if (!clipboards || clipboards.length === 0) return <LandingNoEntry>{dictionary.dashboard.clipboard.noEntry}</LandingNoEntry>

    return (
        <LandingListContainer>
            <LandingList>
                <LandingListHeader>
                    <LandingListHeaderItem className='w-5/6'>{dictionary.dashboard.clipboardList.content}</LandingListHeaderItem>
                    <LandingListHeaderItem className='w-1/6'>{dictionary.dashboard.clipboardList.action}</LandingListHeaderItem>
                </LandingListHeader>
                <LandingListBody>
                    {clipboards.slice(0, 9).map(clip => (
                        <LandingClipboardItem key={clip.id} clipboard={clip} />
                    ))}
                </LandingListBody>
            </LandingList>
        </LandingListContainer>
    )
}

export default React.memo(DashboardClipboardList)
