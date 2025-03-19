import { Skeleton } from '@/components/ui/skeleton'

export default function ConversationSidebarSkeleton() {
    return (
        <div className='flex flex-col gap-2 flex-1'>
            {[...new Array(3)].map((_, index) => {
                return (
                    <div key={'css' + index} className='flex gap-5'>
                        <Skeleton className='size-7 lg:size-11 rounded-full' />
                        <div className='flex-1'>
                            <Skeleton className='h-4 w-full hidden lg:block mb-2' />
                            <Skeleton className='h-4 w-full' />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
