'use client';
import Link from 'next/link';
import React from 'react';
import { FiMenu, FiMinimize2 } from 'react-icons/fi';
function HeaderMenu() {
	const [menu, setMenu] = React.useState(false);
	const menuClass = menu
		? 'fixed lg:static right-0 top-0 h-dvh lg:h-auto w-3/4 lg:w-auto z-10 bg-white p-5 transition linear '
		: 'fixed lg:static right-0 top-0 h-dvh lg:h-auto w-3/4 lg:w-auto z-10 bg-white p-5 transition linear transform translate-x-full';

        const overlayClass = menu 
        ?"block z-0 bg-black opacity-35 fixed h-full w-full top-0 left-0"
        : " hidden z-0 bg-black opacity-35 fixed h-full w-full top-0 left-0"
	return (
		<>
			<button
				className='lg:hidden text-[0px] leading-0 cursor-pointer'
				onClick={() => setMenu(true)}
				type='button'>
				open menu <FiMenu size={25} />
			</button>
            <div className={overlayClass} onClick={() => setMenu(false)} ></div>
			<div className={menuClass}>
				<div className='flex items-center justify-between p-5 border border-gray-300 rounded-xl z-10'>
					<button
						className='lg:hidden text-[0px] leading-0 border border-gray-300 rounded-xl px-4 py-2 cursor-pointer'
						onClick={() => setMenu(false)}
						type='button'>
						close menu <FiMinimize2 size={25} />
					</button>
					<p className='text-xl'>Menu</p>
				</div>

				<nav className='flex flex-col lg:flex-row  items-center lg:gap-5 divide-y divide-y-gray-300 rounded-xl lg:divide-none *:w-full *:p-5 lg:*:w-auto lg:*:p-0 z-10'>
					<Link
						href={'#get-started'}
						className=''>
						get started
					</Link>
					<Link
						href={'#about'}
						className=''>
						about
					</Link>
					<Link
						href={'#contact'}
						className=''>
						contact us
					</Link>
					<Link
						href={'#projects'}
						className=''>
						projects
					</Link>
				</nav>
			</div>
		</>
	);
}

export default React.memo(HeaderMenu);
