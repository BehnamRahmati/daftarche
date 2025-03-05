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
				className='bg-gray-200 dark:bg-[var(--foreground)] rounded-xl w-10 h-10 flex items-center justify-center cursor-pointer'
				onClick={() => dispath(toggleTheme())}
				type='button'>
				{theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
			</button>
		</div>
	);
}
