"use client";
import React from "react";
import ClipboardItem from "@/ui/clipboard/ClipboardItem";
import { useAppSelector } from "@/hooks/hooks";
import { selectClipboards } from "@/libs/features/clipboards/clipboardSlice";
import { selectLang } from "@/libs/features/global/langSlice";

 function ClipboardTable() {
	const {clipboards } = useAppSelector(selectClipboards)
	const lang = useAppSelector(selectLang)
	if (!clipboards) return <p className="border dark:border-[var(--secondary)] border-gray-200 text-gray-500 my-10 lg:my-0 p-5 lg:p-10 text-center rounded-xl">You have no clipboard ath the moment!</p>;
	return (
		<div className='w-full flex flex-col divide-y dark:divide-[var(--secondary)] divide-gray-200 border dark:border-[var(--secondary)] border-gray-200 rounded-xl my-10 lg:my-0'>
			<div className='flex divide-x dark:divide-[var(--secondary)] divide-gray-200 *:font-bold'>
				<div className='flex-1 p-3 '>{lang === 'fa' ? 'محتوا' : 'Content'}</div>
				<div className='w-20 px-0 py-3 text-center lg:w-32'>{lang === 'fa' ? 'عملیات' : 'Action'}</div>
			</div>

			{clipboards?.length ? (
				clipboards.map((clipboard) => (
					<ClipboardItem id={clipboard.id} text={clipboard.content} key={clipboard.id} />
				))
			) : (
				<p className='text-center p-5'>{lang === 'fa' ? 'هیچ موردی یافت نشد!' : 'No item found!'}</p>
			)}
		</div>
	);
}

export default React.memo(ClipboardTable)