'use client';

import { useAppSelector } from '@/hooks/hooks';
import { selectClipboards } from '@/libs/features/clipboards/clipboardSlice';
import React from 'react';
import { FiCopy } from 'react-icons/fi';

export default function DashboardClipboards() {
	const { clipboards } = useAppSelector(selectClipboards);
	if (!clipboards || !clipboards.length)
		return (
			<p className=' text-gray-500 my-10 lg:my-0 p-5 lg:p-10 text-center rounded-xl'>
				You have no clipboard ath the moment!
			</p>
		);
	const handleCopy = React.useCallback(async (text: string) => {
		console.warn('handleCopy rendered');
		try {
			await navigator.clipboard.writeText(text);
		} catch (err) {
			console.log('failed to copy to clipboard');
		}
	}, []);
	return (
		<div className='flex flex-col gap-2'>
			{clipboards.length ? (
				clipboards.map((clip) => (
					<div className='flex items-center p-2 rounded-xl odd:bg-zinc-100 odd:dark:bg-[var(--background)]' key={clip.id}>
						<p className='truncate w-5/6'>{clip.content}</p>
						<button
							className='text-[0px] leading-0 w-1/6 place-items-end cursor-pointer'
							type='button'>
							copy
							<FiCopy
								onClick={() => handleCopy(clip.content)}
								size={20}
							/>
						</button>
					</div>
				))
			) : (
				<p className='text-center'>no clipboards</p>
			)}
		</div>
	);
}
