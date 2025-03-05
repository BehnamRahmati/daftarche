'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { i18n } from '@/app/i18n';
import Dropdown from 'rc-dropdown';
import { IoLanguageOutline } from 'react-icons/io5'

export default function LanguageSwitcher() {

	return (
		<Dropdown
			trigger={['click']}
			animation='slide-up'
			overlay={<LangMenu />}>
			<button
				className='bg-gray-200 dark:bg-[var(--foreground)] text-[0px] leading-0 rounded-xl w-10 h-10 flex items-center justify-center cursor-pointer'
				type='button'>
				toggle lang
				<IoLanguageOutline size={20} />
			</button>
		</Dropdown>
	);
}

function LangMenu() {
	const pathname = usePathname();
	const getLocalizedPath = (locale: string) => {
		const segments = pathname.split('/');
		segments[1] = locale;
		return segments.join('/');
	};

	return (
		<div
			className={`overflow-hidden flex flex-col bg-white dark:bg-[var(--foreground)] *:p-3 divide-y divide-gray-200 dark:divide-[var(--secondary)] rounded-xl border dark:border-[var(--secondary)] border-gray-200 *:flex  *:hover:bg-gray-100 dark:*:hover:bg-[var(--background)]`}>
			{i18n.locales.map((locale) => (
				<Link
				className='font-iranyekan text-center'
					key={locale}
					href={getLocalizedPath(locale)}>
						
					{locale === 'fa' ? 'فارسی' : 'English'}
				</Link>
			))}
		</div>
	);
}
