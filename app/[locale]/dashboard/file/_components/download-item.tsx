import React from 'react'

import { formatFileSize } from '@/lib/file-helpers'
import { TFile } from '@/lib/types'
import Link from 'next/link'
import { PiClockCounterClockwiseLight, PiCloudCheckLight, PiDownload, PiWarningCircleLight } from 'react-icons/pi'
import { LandingListBodyItem, LandingListBodyRow } from '../../_components/landing'

function DownloadItem({ file }: { file: TFile }) {
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
            <LandingListBodyItem className='w-1/5 text-xs'>{formatFileSize(file.size)}</LandingListBodyItem>
            <LandingListBodyItem className='w-1/5'>
                {file.status === 'COMPLETED' && (
                    <Link download target='_blank' href={file.url}>
                        <PiDownload size={25} />
                    </Link>
                )}
            </LandingListBodyItem>
        </LandingListBodyRow>
    )
}

export default React.memo(DownloadItem)
