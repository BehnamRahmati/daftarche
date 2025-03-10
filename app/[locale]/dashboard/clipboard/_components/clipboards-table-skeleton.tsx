import { Skeleton } from '@/components/ui/skeleton'

export default function ClipboardTableSkeleton() {
    return (
        <div className='mt-10 flex flex-col'>
            <div className='mb-5 flex items-center justify-between'>
                <Skeleton className='w-sm h-8' />

                <div className='flex items-center gap-2'>
                    <Skeleton className='h-9 w-12' />
                    <Skeleton className='h-9 w-9' />
                </div>
            </div>
            <div className='mb-5  flex flex-col gap-1'>
                <Skeleton className=' h-9 w-full' />
                <Skeleton className=' h-9 w-full' />
                <Skeleton className=' h-9 w-full' />
                <Skeleton className=' h-9 w-full' />
                <Skeleton className=' h-9 w-full' />
                <Skeleton className=' h-9 w-full' />
                <Skeleton className=' h-9 w-full' />
                <Skeleton className=' h-9 w-full' />
                <Skeleton className=' h-9 w-full' />
                <Skeleton className=' h-9 w-full' />
            </div>
            <div className='flex items-center justify-end gap-2'>
                <Skeleton className='h-9 w-12' />
                <Skeleton className='h-9 w-9' />
                <Skeleton className='h-9 w-9' />
                <Skeleton className='h-9 w-12' />
            </div>
        </div>
    )
}
