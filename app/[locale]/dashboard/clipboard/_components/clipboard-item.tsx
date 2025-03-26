import { TClipboard } from '@/lib/types'
import React from 'react'
import { LandingListBodyItem, LandingListBodyRow } from '../../_components/landing'
import { ActionsCell } from './columns-cell'

function ClipboardItem({ clipboard }: { clipboard: TClipboard }) {
    return (
        <LandingListBodyRow key={clipboard.id}>
            <LandingListBodyItem className='w-5/6 truncate'>{clipboard.content}</LandingListBodyItem>
            <LandingListBodyItem className='w-1/6 shrink-0 cursor-pointer flex justify-center'>
                <ActionsCell clipboard={clipboard} />
            </LandingListBodyItem>
        </LandingListBodyRow>
    )
}

export default React.memo(ClipboardItem)
