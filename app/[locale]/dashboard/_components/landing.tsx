import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import React from 'react'

function LandingWrapper({ className, ...props }: React.ComponentProps<'div'>) {
    return <div className={cn('flex size-full flex-col gap-2.5 lg:flex-row', className)} {...props} />
}

function LandingSidebar({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            className={cn('border-sidebar-border bg-sidebar w-full rounded-lg border lg:w-4/12 p-2.5', className)}
            {...props}
        />
    )
}

function LandingContent({ className, ...props }: React.ComponentProps<'div'>) {
    return <div className={cn('flex flex-col gap-2.5 lg:w-8/12', className)} {...props} />
}

function LandingSection({ className, ...props }: React.ComponentProps<'div'>) {
    return <div className={cn('border-sidebar-border bg-sidebar rounded-lg border p-2.5', className)} {...props} />
}

function LandingTitle({ className, ...props }: React.ComponentProps<'h2'>) {
    return <h2 className={cn('mb-2.5 text-base lg:text-xl font-bold', className)} {...props} />
}

function LandingListContainer({ className, ...props }: React.ComponentProps<'div'>) {
    return <div className={cn('overflow-hidden', className)} {...props} />
}

function LandingList({ className, ...props }: React.ComponentProps<'div'>) {
    return <div className={cn('flex flex-col gap-2', className)} {...props} />
}

function LandingListHeader({ className, ...props }: React.ComponentProps<'ul'>) {
    return <ul className={cn('flex flex-row items-center justify-between bg-sidebar-accent rounded-lg', className)} {...props} />
}

function LandingListHeaderItem({ className, ...props }: React.ComponentProps<'ul'>) {
    return <ul className={cn('p-2.5 text-xs md:text-sm', className)} {...props} />
}

function LandingListBody({ className, ...props }: React.ComponentProps<'ul'>) {
    return <ul className={cn('flex flex-col gap-2', className)} {...props} />
}

function LandingListBodyRow({ className, ...props }: React.ComponentProps<'li'>) {
    return (
        <li
            className={cn('flex flex-row items-center justify-between even:bg-sidebar-accent rounded-lg', className)}
            {...props}
        />
    )
}

function LandingListBodyItem({ className, ...props }: React.ComponentProps<'div'>) {
    return <div className={cn('p-2.5 text-xs md:text-sm', className)} {...props} />
}

export default function DashboardUserSkeleton() {
    return (
        <div className='w-full flex flex-col gap-5'>
            <div className='p-5 bg-background  border border-sidebar-border rounded-lg w-full'>
                <div className='flex items-center gap-5'>
                    <Skeleton className='size-7 lg:size-15 rounded-full' />
                    <div className='flex-1'>
                        <Skeleton className='h-7 w-full mb-2' />
                        <Skeleton className='h-7 w-full' />
                    </div>
                </div>
            </div>
            <div className='p-5 bg-background border border-sidebar-border flex flex-col gap-5 rounded-lg'>
                <Skeleton className='h-7 w-full hidden lg:block mb-2' />
                <Skeleton className='h-7 w-full' />
            </div>
        </div>
    )
}

export {
    DashboardUserSkeleton,
    LandingContent,
    LandingList,
    LandingListBody,
    LandingListBodyItem,
    LandingListBodyRow,
    LandingListContainer,
    LandingListHeader,
    LandingListHeaderItem,
    LandingSection,
    LandingSidebar,
    LandingTitle,
    LandingWrapper,
}
