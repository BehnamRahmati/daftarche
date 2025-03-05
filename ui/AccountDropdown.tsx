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
		<div className='pt-2'>
			<div className='dropdown-container'>
				<Link href='/account'>
					<FiUser className='text-sm lg:text-xl' />
					<p className={lang === 'fa' ? 'text-xs lg:text-base mr-4' : 'text-xs lg:text-base ml-4'}>
						{lang === 'fa' ? 'پروفایل' : 'Profile'}
					</p>
				</Link>
				<button
					type='button'
					onClick={() => signOut()}
					className='text-[0px] leading-0 cursor-pointer '>
					{lang === 'fa' ? 'خروج' : 'SignOut'}
					<FiLogOut className='text-sm lg:text-xl' />
					<p className={lang === 'fa' ? 'text-xs lg:text-base mr-4' : 'text-xs lg:text-base ml-4'}>
						{lang === 'fa' ? 'خروج' : 'SignOut'}
					</p>
				</button>
			</div>
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
				className='button-primary'>
				open
				<Image
					className='bg-zinc-200 dark:bg-[var(--foreground)] rounded-full h-4 w-4 lg:h-6 lg:w-6 mr-2'
					src={user.image}
					alt={user.name}
					width={20}
					height={20}
				/>
				<p className='text-xs lg:text-base mr-2'>{user.name}</p>
				<FiChevronDown className='text-sm lg:text-xl' />
			</button>
		</Dropdown>
	);
}
