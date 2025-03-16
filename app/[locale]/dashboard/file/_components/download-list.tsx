'use client'

import { TFile } from '@/lib/types'
import moment from 'moment'
import Link from 'next/link'
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

async function fetcher(url: string): Promise<TFile[]> {
    const response = await fetch(url)
    return await response.json()
}

function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export default function DownloadList({ email }: { email: string }) {
    const { data: files, isLoading } = useSWR(`/api/file?email=${encodeURIComponent(email)}`, fetcher , {
        refreshInterval: 2000
    })

    if (isLoading || !files) return <p>loading</p>

    return (
        <div className='mt-20 w-full lg:max-w-5xl mx-auto'>
            <LandingListContainer>
                <LandingList>
                    <LandingListHeader>
                        <LandingListHeaderItem>filename</LandingListHeaderItem>
                        <LandingListHeaderItem>size</LandingListHeaderItem>
                        <LandingListHeaderItem>status</LandingListHeaderItem>
                        <LandingListHeaderItem>createdat</LandingListHeaderItem>
                        <LandingListHeaderItem>action</LandingListHeaderItem>
                    </LandingListHeader>
                    <LandingListBody>
                        {files.length !== 0 ? (
                            files.map(file => {
                                return (
                                    <LandingListBodyRow key={file.id}>
                                        <LandingListBodyItem>{file.filename}</LandingListBodyItem>
                                        <LandingListBodyItem>{formatFileSize(file.size)}</LandingListBodyItem>
                                        <LandingListBodyItem>{file.status}</LandingListBodyItem>
                                        <LandingListBodyItem>{moment(file.createdAt).fromNow()}</LandingListBodyItem>
                                        <LandingListBodyItem>
                                            <Link download target='_blank' href={file.url}>
                                                download
                                            </Link>
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
    )
}
