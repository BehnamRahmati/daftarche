"use client";

import "rc-dropdown/assets/index.css";
import React from "react";
import Dropdown from "rc-dropdown";
import Image from "next/image";
import { FiChevronDown, FiUser, FiLogOut } from "react-icons/fi";

import { signOut } from "next-auth/react";
import { Poppins } from "next/font/google";
import Link from "next/link";

export const poppins = Poppins({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	style: ["normal", "italic"],
	subsets: ["latin"],
});

const Menu = () => {
	return (
		<div
			className={`${poppins.className} overflow-hidden flex flex-col bg-white *:p-3 divide-y divide-gray-200 rounded-xl border border-gray-200 *:flex *:hover:bg-gray-100`}
		>
			<Link href='/account'>
				<FiUser size={20} />
				<p className='text-base ml-4'>Profile</p>
			</Link>
			<button type='button' onClick={() => signOut()} className='text-[0px] leading-0 cursor-pointer'>
                signOut
                <FiLogOut size={20} />
				<p className='text-base ml-4'>SignOut</p>
			</button>
		</div>
	);
};

export default function AccountDropdown({
	image,
	name,
}: {
	image: string;
	name: string;
}) {
	return (
		<Dropdown trigger={["click"]} animation='slide-up' overlay={<Menu />}>
			<button
				type='button'
				className='flex items-center cursor-pointer text-[0px] border border-gray-300 py-2 px-3 rounded-xl'
			>
				open
				<Image
					className='bg-gray-200 rounded-full h-6 w-6 mr-2'
					src={image}
					alt={name}
					width={20}
					height={20}
				/>
				<p className='text-base mr-2'>{name}</p>
				<FiChevronDown size={20} />
			</button>
		</Dropdown>
	);
}
