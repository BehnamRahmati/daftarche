'use client'

import React, { useState } from 'react'
import { LuPanelLeftOpen, LuPanelRightOpen } from 'react-icons/lu'

export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
    const [closeSidebar, setCloseSidecar] = useState(false)
    return (
        <div className={`layout-sidebar ${closeSidebar ? 'lg:w-18' : 'lg:w-2xs'}`}>
            <div className='logo mb-3 flex items-center justify-between border-b pb-3 text-xl font-bold italic leading-6 lg:border-zinc-300 dark:border-[var(--secondary-heavy)]'>
                <div className={closeSidebar ? 'flex-1 text-center transition-all delay-200' : ''}>
                    {closeSidebar ? 'DF' : 'Daftarche'}
                </div>
                <LuPanelRightOpen
                    onClick={() => setCloseSidecar(true)}
                    className={`hidden cursor-pointer ${!closeSidebar && 'lg:block'}`}
                    size={20}
                />
            </div>
            {children}
            <div
                className={`${closeSidebar ? 'flex' : 'hidden'} mb-0 mt-auto w-full cursor-pointer items-center justify-center rounded-md px-3`}
            >
                <LuPanelLeftOpen onClick={() => setCloseSidecar(false)} size={20} />
            </div>
        </div>
    )
}
