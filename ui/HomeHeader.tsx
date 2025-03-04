
import React from 'react';
import HeaderMenu from './HeaderMenu';

export default function HomeHeader() {
	return (
		<header>
			<div className='border-b border-b-gray-300 bg-white '>
				<div className='container mx-auto flex items-center justify-between p-5 lg:px-0'>
					<div className='text-3xl'>Daftarche</div>
					<HeaderMenu />
				</div>
			</div>
		</header>
	);
}
