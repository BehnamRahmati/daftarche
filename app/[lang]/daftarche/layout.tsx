import React from 'react';

import Sidebar from '@/ui/daftarche/organisms/global/Sidebar';
import Header from '@/ui/daftarche/organisms/global/Header';
import Footer from '@/ui/daftarche/organisms/global/Footer';
import { getServerSession } from 'next-auth/next';
import AuthButton from '@/ui/AuthButton';
import { authOptions } from '@/libs/auth';
import { serverFetchUser, serverFetchUserClipboards } from '@/libs/api';
import { notFound } from 'next/navigation';
import { i18n } from '@/app/i18n';
import ReduxProviders from '@/ui/ReduxProviders';

type TProps = Readonly<{
	children: React.ReactNode;
	params: Promise<{ lang: 'en' | 'fa' }>;
}>;

export default async function DaftarcheLayout({ children, params }: TProps) {
	const { lang } = await params;
	if (!i18n.locales.includes(lang)) {
		// Redirect to the default locale if `lang` is invalid
		notFound();
	}
	
	const session = await getServerSession(authOptions);

	if (!session || !session.user || !session.user.email) {
		return (
			<div className='grid place-content-center h-screen w-screen p-10  dark:bg-[var(--background)]'>
				<div className='bg-gray-100  dark:bg-[var(--foreground)] w-xs rounded-xl p-5 flex flex-col items-center'>
					<p className='text-2xl font-bold text-center mb-5'>Sign in to Daftarche</p>
					<AuthButton />
				</div>
			</div>
		);
	}

	const clipboards = await serverFetchUserClipboards(session.user.email);
	const user = await serverFetchUser(session.user.email);

	return (
		<ReduxProviders
			lang={lang}
			clipboards={clipboards}
			user={user}>
			<div className='flex flex-col lg:flex-row min-h-dvh'>
				<Sidebar lang={lang} />
				<main className='flex flex-col flex-1 not-only:lg:min-h-dvh w-full max-w-full lg:max-w-[calc(100%-16rem)] lg:px-5'>
					<Header />
					<div className='flex-1 px-3 py-5 lg:p-10 lg:border dark:border-[var(--secondary)] border-gray-200 rounded-3xl'>
						{children}
					</div>
					<Footer />
				</main>
			</div>
		</ReduxProviders>
	);
}
