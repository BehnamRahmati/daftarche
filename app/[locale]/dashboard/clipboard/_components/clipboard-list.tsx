import { TClipboard } from '@/lib/types'
import {
    LandingList,
    LandingListBody,
    LandingListContainer,
    LandingListHeader,
    LandingListHeaderItem,
} from '../../_components/landing'

import ClipboardItem from './clipboard-item'

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
                        clipboards.map(clip => <ClipboardItem key={clip.id} clipboard={clip} />)
                    )}
                </LandingListBody>
            </LandingList>
        </LandingListContainer>
    )
}
