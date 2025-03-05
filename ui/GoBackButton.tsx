'use client';
import { useAppSelector } from '@/hooks/hooks';
import { selectLang } from '@/libs/features/global/langSlice';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
export default function GoBackButton() {
	const router = useRouter();
	const lang = useAppSelector(selectLang);
	const pathname = usePathname();
	if (pathname === '/') return '';
	return (
		<button
			type='button'
			title='go back'
			onClick={() => router.back()}
			className='button-primary'>
			go back
			{lang === 'fa' ? <FiArrowRight className='text-sm lg:text-xl' /> : <FiArrowLeft className='text-sm lg:text-xl' />}
		</button>
	);
}
