import React from 'react';

import Sidebar from '@/ui/daftarche/organisms/global/Sidebar';
import Header from '@/ui/daftarche/organisms/global/Header';
import Footer from '@/ui/daftarche/organisms/global/Footer';
import { getServerSession } from 'next-auth/next';
import AuthButton from '@/ui/AuthButton';
import { authOptions } from '@/libs/auth';

type TProps = {
	children: React.ReactNode;
};

export default async function DaftarcheLayout({ children }: TProps) {
	const session = await getServerSession(authOptions);

	if (!session) {
		return (
			<div>
				<div className='grid place-content-center h-screen w-screen p-10'>
					<div className='bg-gray-100 w-xs rounded-xl p-5 flex flex-col items-center'>
						<p className='text-2xl font-bold text-center mb-5'>Sign in to Daftarche</p>
						<AuthButton />
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='flex flex-col lg:flex-row min-h-dvh'>
			<Sidebar />
			<main className='flex flex-col flex-1 not-only:lg:min-h-dvh w-full max-w-full lg:max-w-[calc(100%-16rem)] lg:px-5'>
				<Header />
				<div className='flex-1 px-3 py-5 lg:p-10 lg:border border-gray-200 rounded-3xl'>
					{children}
				</div>
				<Footer />
			</main>
		</div>
	);
}
