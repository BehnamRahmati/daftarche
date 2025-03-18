'use client'

import { Button } from '@/components/ui/button'
import { fetchUserClipboards } from '@/lib/clipboard-helpers'
import { TDictionary, TUser } from '@/lib/types'
import { useParams } from 'next/navigation'
import { FiCopy } from 'react-icons/fi'
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
import React from 'react'

function DashboardClipboardList({ user, dictionary }: { user: TUser; dictionary: TDictionary }) {
    const { locale } = useParams()

    const {
        data: clipboards,
        isLoading,
        error,
    } = useSWR(`/api/clipboard?email=${encodeURIComponent(user.email)}`, fetchUserClipboards)

    if (isLoading) return <LandingListSkleton count={15} section='clipboards' />

    if (error) return <p className='p-2.5 text-center'>error : no clipboards</p>
    if (!clipboards || clipboards.length === 0)
        return <LandingNoEntry>{dictionary.dashboard.clipboard.noEntry}</LandingNoEntry>

    return (
        <LandingListContainer>
            <LandingList>
                <LandingListHeader>
                    <LandingListHeaderItem className='w-5/6'>{dictionary.dashboard.clipboardList.content}</LandingListHeaderItem>
                    <LandingListHeaderItem className='w-1/6'>{dictionary.dashboard.clipboardList.action}</LandingListHeaderItem>
                </LandingListHeader>
                <LandingListBody>
                    {clipboards.slice(0,9).map(clip => (
                        <LandingListBodyRow key={clip.id}>
                            <LandingListBodyItem className='w-5/6 truncate text-sm'>{clip.content}</LandingListBodyItem>
                            <LandingListBodyItem className='w-1/6 shrink-0 cursor-pointer flex justify-center'>
                                <Button
                                    variant={'ghost'}
                                    size={'sm'}
                                    className='h-5 cursor-pointer hover:bg-transparent'
                                    onClick={() => navigator.clipboard.writeText(clip.content)}
                                    title={locale === 'en' ? 'copy' : 'کپی'}
                                >
                                    <FiCopy size={20} />
                                </Button>
                            </LandingListBodyItem>
                        </LandingListBodyRow>
                    ))}
                </LandingListBody>
            </LandingList>
        </LandingListContainer>
    )
}

export default React.memo(DashboardClipboardList)
