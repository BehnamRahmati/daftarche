
import DashboardChats from '@/ui/dashboard/DashboardChats';
import DashboardClipboards from '@/ui/dashboard/DashboardClipboards';
import DashboardSlider from '@/ui/dashboard/DashboardSlider';
import DashboardUser from '@/ui/dashboard/DashboardUser';
import React from 'react';
import 'swiper/swiper-bundle.css';

export default function Daftarche() {
	
	return (
		<div className='size-full flex gap-10'>
			<div className='flex flex-col gap-10 flex-1 size-full '>
				{/* user and files info */}
				<div className='grid grid-cols-2 gap-10'>
					{/* user info */}
					<div className='flex gap-5'>
						<DashboardUser />
						<div className='w-2/5 p-5 border border-zinc-200 dark:border-[var(--secondary-heavy)] rounded-3xl bg-white dark:bg-[var(--foreground)]'>
							<div className='font-bold text-xl'>used space</div>
							<div className='mt-5 flex justify-center'>
								<div className='w-36 h-36 rounded-full bg-zinc-200'></div>
							</div>
						</div>
					</div>
					{/* files info */}
					<div className=''>
						<div className='font-bold text-xl'>Recent files</div>
						<DashboardSlider />
					</div>
				</div>
				{/* chats info */}
				<div className='p-5 border border-zinc-200 dark:border-[var(--secondary-heavy)] rounded-3xl bg-white dark:bg-[var(--foreground)]'>
					<div className='text-2xl font-bold'>recent chats</div>
					<DashboardChats />
				</div>
			</div>
			{/* clipboard info */}
			<div className='w-xs bg-white dark:bg-[var(--foreground)] rounded-3xl p-5 border border-zinc-200 dark:border-[var(--secondary-heavy)]'>
				<div className='text-xl font-bold mb-5'>Recent Clipboards</div>
				<DashboardClipboards />
			</div>
		</div>
	);
}
