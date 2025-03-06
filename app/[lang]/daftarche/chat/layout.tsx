import React from 'react';

export default async function ChatLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ lang: 'en' | 'fa' }>;
}) {
	const { lang } = await params;
	return (
		<div className='flex gap-5 h-full'>
			<div className='flex-1 bg-white dark:bg-[var(--foreground)] border border-zinc-200 dark:border-[var(--secondary-heavy)] h-full rounded-3xl p-5'>{children}</div>
			<div className='w-xs  bg-white border border-zinc-200 dark:border-[var(--secondary-heavy)] dark:bg-[var(--foreground)] rounded-3xl p-5 h-full'>
				<h2 className='text-3xl text-center font-bold'>{lang === 'fa' ? 'چت' : 'chat'}</h2>
			</div>
		</div>
	);
}
