'use client';
import React from 'react';
import ClipboardItem from '@/ui/clipboard/ClipboardItem';
import { useAppSelector } from '@/hooks/hooks';
import { selectClipboards } from '@/libs/features/clipboards/clipboardSlice';
import { selectLang } from '@/libs/features/global/langSlice';

function ClipboardTable() {
	const { clipboards } = useAppSelector(selectClipboards);
	const lang = useAppSelector(selectLang);
	if (!clipboards || !clipboards.length)
		return (
			<p className=' text-gray-500 my-10 lg:my-0 p-5 lg:p-10 text-center rounded-xl'>
				You have no clipboard ath the moment!
			</p>
		);
	return (
		<div className='w-full flex flex-col gap-y-1 rounded-xl my-10 lg:my-0 '>
			<div className='flex *:py-3 w-full *:font-bold bg-zinc-200 dark:bg-[var(--foreground)] rounded-xl'>
				<div className='px-5 w-4/5 '>{lang === 'fa' ? 'محتوا' : 'Content'}</div>
				<div className='text-center w-1/5'>{lang === 'fa' ? 'عملیات' : 'Action'}</div>
			</div>

			{clipboards.map((clipboard) => (
				<ClipboardItem
					id={clipboard.id}
					text={clipboard.content}
					key={clipboard.id}
				/>
			))}
		</div>
	);
}

export default React.memo(ClipboardTable);
