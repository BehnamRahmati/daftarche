import { TFile } from '@/lib/types'
import moment from 'moment'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export function CreatedAtCell({ file }: { file: TFile }) {
    const locale = useParams().locale as 'en' | 'fa'
    const fromNow = moment(file.createdAt).locale(locale).fromNow()
    return <div className=''>{fromNow}</div>
}

export function StatusCell({ file }: { file: TFile }) {
    return (
        <div className=''>
            {file.status === 'COMPLETED' && <span className='text-green-500'>completed</span>}
            {file.status === 'PENDING' && <span className='text-amber-500'>pending</span>}
            {file.status === 'FAILED' && <span className='text-red-500'>failed</span>}
        </div>
    )
}

export function ActionCell({ file }: { file: TFile }) {
    return (
        <div className=''>
            {file.status === 'COMPLETED' && (
                <Link download target='_blank' href={file.url}>
                    download
                </Link>
            )}
        </div>
    )
}
