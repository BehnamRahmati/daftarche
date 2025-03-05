'use client';

import 'rc-dropdown/assets/index.css';
import React from 'react';
import Dropdown from 'rc-dropdown';
import Image from 'next/image';
import { FiChevronDown, FiUser, FiLogOut } from 'react-icons/fi';

import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useAppSelector } from '@/hooks/hooks';
import { selectUser } from '@/libs/features/users/userSlice';
import { selectLang } from '@/libs/features/global/langSlice';

const Menu = () => {
	const lang = useAppSelector(selectLang);
	return (
		<div
			className={`font-iranyekan overflow-hidden flex flex-col bg-white dark:bg-[var(--foreground)] *:p-3 divide-y divide-gray-200 dark:divide-[var(--secondary)] rounded-xl border dark:border-[var(--secondary)] border-gray-200 *:flex  *:hover:bg-gray-100 dark:*:hover:bg-[var(--background)]`}>
			<Link href='/account'>
				<FiUser size={20} />
				<p className={lang === 'fa' ? 'text-base mr-4' : 'text-base ml-4'}>
					{lang === 'fa' ? 'پروفایل' : 'Profile'}
				</p>
			</Link>
			<button
				type='button'
				onClick={() => signOut()}
				className='text-[0px] leading-0 cursor-pointer '>
				{lang === 'fa' ? 'خروج' : 'SignOut'}
				<FiLogOut size={20} />
				<p className={lang === 'fa' ? 'text-base mr-4' : 'text-base ml-4'}>
					{lang === 'fa' ? 'خروج' : 'SignOut'}
				</p>
			</button>
		</div>
	);
};

export default function AccountDropdown() {
	const { user } = useAppSelector(selectUser);

	if (!user) return <p>no user</p>;

	return (
		<Dropdown
			trigger={['click']}
			animation='slide-up'
			overlay={<Menu />}>
			<button
				type='button'
				className='flex items-center cursor-pointer text-[0px] border dark:border-[var(--secondary)] border-gray-300 py-2 px-3 rounded-xl'>
				open
				<Image
					className='bg-gray-200 dark:bg-[var(--foreground)] rounded-full h-6 w-6 mr-2'
					src={user.image}
					alt={user.name}
					width={20}
					height={20}
				/>
				<p className='text-base mr-2'>{user.name}</p>
				<FiChevronDown size={20} />
			</button>
		</Dropdown>
	);
}
