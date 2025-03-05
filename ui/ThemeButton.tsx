'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { selectTheme, toggleTheme } from '@/libs/features/global/themeSlice';
import React from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

export default function ThemeButton() {
	const theme = useAppSelector(selectTheme);
	const dispath = useAppDispatch();

	return (
		<div>
			<button
				className='button-primary'
				title='change theme'
				onClick={() => dispath(toggleTheme())}
				type='button'>
				{theme === 'dark' ? <FiSun className='text-sm lg:text-xl' /> : <FiMoon className='text-sm lg:text-xl' />}
			</button>
		</div>
	);
}
