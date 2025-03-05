'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { i18n } from '@/app/i18n';
import Dropdown from 'rc-dropdown';
import { IoLanguageOutline } from 'react-icons/io5';

export default function LanguageSwitcher() {
	return (
		<Dropdown
			trigger={['click']}
			animation='slide-up'
			overlay={<LangMenu />}>
			<button
				className='button-primary'
				title='toggle language'
				type='button'>
				toggle language
				<IoLanguageOutline className='text-sm lg:text-xl' />
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
		<div className='pt-2'>
			<div className='dropdown-container'>
				{i18n.locales.map((locale) => (
					<Link
						className='font-iranyekan text-center text-xs lg:text-base'
						key={locale}
						href={getLocalizedPath(locale)}>
						{locale === 'fa' ? 'فا' : 'En'}
					</Link>
				))}
			</div>
		</div>
	);
}
