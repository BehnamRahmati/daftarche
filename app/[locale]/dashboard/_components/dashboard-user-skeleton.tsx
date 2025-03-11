import { Skeleton } from '@/components/ui/skeleton'

export default function DashboardUserSkeleton() {
    return (
        <div className='w-full lg:w-2/5 flex flex-col gap-5'>
            <div className='p-5 bg-background lg:shadow-md order border-accent rounded-3xl'>
                <div className='flex items-center gap-5'>
                    <Skeleton className='size-7 lg:size-15 rounded-full' />
                    <div className='flex-1'>
                        <Skeleton className='h-7 w-full mb-2' />
                        <Skeleton className='h-7 w-full' />
                    </div>
                </div>
            </div>
            <div className='p-5 bg-background lg:shadow-md border border-accent flex flex-col gap-5 rounded-3xl'>
                <Skeleton className='h-7 w-full hidden lg:block mb-2' />
                <Skeleton className='h-7 w-full' />
            </div>
        </div>
    )
}
