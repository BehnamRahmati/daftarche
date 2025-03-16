import { TClipboard } from '@/lib/types'
import {
    LandingList,
    LandingListBody,
    LandingListBodyItem,
    LandingListBodyRow,
    LandingListContainer,
    LandingListHeader,
    LandingListHeaderItem,
} from '../../_components/landing'
import { ActionsCell } from './columns-cell'

export default function ClipboardList({ clipboards }: { clipboards: TClipboard[] }) {
    return (
        <LandingListContainer>
            <LandingList>
                <LandingListHeader>
                    <LandingListHeaderItem className='w-5/6'>
                        content
                        {/* {dictionary.dashboard.clipboardList.content} */}
                    </LandingListHeaderItem>
                    <LandingListHeaderItem className='w-1/6'>
                        action
                        {/* {dictionary.dashboard.clipboardList.action} */}
                    </LandingListHeaderItem>
                </LandingListHeader>
                <LandingListBody>
                    {clipboards.length === 0 ? (
                        <p className='p-2.5 text-center'>{/* {dictionary.dashboard.clipboard.noEntry} */}</p>
                    ) : (
                        clipboards.map(clip => (
                            <LandingListBodyRow key={clip.id}>
                                <LandingListBodyItem className='w-5/6 truncate'>{clip.content}</LandingListBodyItem>
                                <LandingListBodyItem className='w-1/6 shrink-0 cursor-pointer flex justify-center'>
                                    <ActionsCell clipboard={clip} />
                                </LandingListBodyItem>
                            </LandingListBodyRow>
                        ))
                    )}
                </LandingListBody>
            </LandingList>
        </LandingListContainer>
    )
}
