import React from 'react'

export default function SkeletonClipboardList() {
    return (
        <div role='status' className='animate-pulse'>
            <div className='skeleton-item'></div>
            <div className='skeleton-item'></div>
            <div className='skeleton-item'></div>
            <div className='skeleton-item'></div>
            <div className='skeleton-item'></div>
            <div className='skeleton-item'></div>
            <span className='sr-only'>Loading...</span>
        </div>
    )
}
