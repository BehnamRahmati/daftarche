'use client';

import React, { useState } from 'react';
import Sidebarlink from './Sidebarlink';
import { FiClipboard, FiFile, FiMessageCircle } from 'react-icons/fi';
import { LuPanelLeftOpen, LuPanelRightOpen } from 'react-icons/lu';
import { LuLayoutGrid } from "react-icons/lu";
function SidebarMenu() {
	const [closeSidebar, setCloseSidecar] = useState(false);

	return (
		<div
			className={`px-3 flex flex-col relative py-5 w-full overflow-hidden transition-all duration-400 dark:bg-[var(--foreground)] h-full rounded-xl shadow-lg dark:shadow-black lg:border lg:border-zinc-300 lg:dark:border-[var(--secondary-heavy)] ${
				closeSidebar ? 'lg:w-18' :  'lg:w-56'
			}`}>
			<div className='logo text-xl font-bold flex items-center justify-between pb-3 mb-3 leading-6 italic border-b lg:border-zinc-300 dark:border-[var(--secondary-heavy)]'>
				<div className={closeSidebar ? 'flex-1 text-center transition-all delay-200' :  ''}>{closeSidebar ? 'DF' : 'Daftarche'}</div>
				<LuPanelRightOpen
					onClick={() => setCloseSidecar(true)}
					className={`cursor-pointer hidden ${!closeSidebar && 'lg:block'}`}
					size={20}
				/>
			</div>
            
			<nav className='flex justify-between lg:justify-start lg:flex-col flex-1 lg:flex-none gap-1 overflow-hidden'>
				<Sidebarlink
					closeSidebar={closeSidebar}
					link='/daftarche'
					text='Dashboard'
					faText='داشبرد'>
					<LuLayoutGrid className='text-sm lg:text-xl' />
				</Sidebarlink>

				<Sidebarlink
					closeSidebar={closeSidebar}
					link='/daftarche/clipboard'
					text='Clipboard'
					faText='کلیپ بورد'>
					<FiClipboard className='text-sm lg:text-xl' />
				</Sidebarlink>

				<Sidebarlink
					closeSidebar={closeSidebar}
					link='/daftarche/file'
					text='Files'
					faText='فایل'>
					<FiFile className='text-sm lg:text-xl' />
				</Sidebarlink>

				<Sidebarlink
					closeSidebar={closeSidebar}
					link='/daftarche/chat'
					text='Chat'
					faText='چت'>
					<FiMessageCircle className='text-sm lg:text-xl' />
				</Sidebarlink>
			</nav>
            <div className={`${closeSidebar ?  'flex' : 'hidden'} items-center justify-center cursor-pointer w-full px-3 rounded-md mt-auto mb-0`}>
                <LuPanelLeftOpen
                onClick={() => setCloseSidecar(false)}
                size={20} />
            </div>
		</div>
	);
}

export default React.memo(SidebarMenu);
