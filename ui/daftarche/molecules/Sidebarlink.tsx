'use client';
import { generateLocalePath } from '@/app/i18n';
import { useAppSelector } from '@/hooks/hooks';
import { selectLang } from '@/libs/features/global/langSlice';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type TProp = {
	children: React.ReactNode;
	text: string;
	link: string;
	faText: string;
	closeSidebar: boolean;
};

function Sidebarlink({ children, text, link, faText, closeSidebar }: TProp) {
	const pathname = usePathname();
	const lang = useAppSelector(selectLang);
	const classNames = pathname.endsWith(link) ? 'bg-zinc-200 dark:bg-[var(--secondary-dark)] font-bold' : '';

	return (
		<Link
			href={generateLocalePath(lang, link)}
			className={`flex items-center lg:justify-start justify-center lg:w-full *:h-6 py-1.5 px-2 lg:p-3 *:leading-6 hover:bg-zinc-200 dark:hover:bg-[var(--foreground)] rounded-md lg:rounded-xl ${classNames}`}>
			{children}
			<p className={`${closeSidebar ? "text-[0px] delay-100": "text-xs mx-1 lg:mx-4 lg:text-base delay-300"} `}>{lang === 'fa' ? faText : text}</p>
		</Link>
	);
}

export default React.memo(Sidebarlink);
