import React from 'react';

import Sidebar from '@/ui/daftarche/organisms/global/Sidebar';
import Header from '@/ui/daftarche/organisms/global/Header';
import Footer from '@/ui/daftarche/organisms/global/Footer';
import { getServerSession } from 'next-auth/next';
import AuthButton from '@/ui/AuthButton';
import { authOptions } from '@/libs/auth';
import { serverFetchUser, serverFetchUserClipboards, ServerfetchUsetConversations } from '@/libs/api';
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
	const chats = await ServerfetchUsetConversations(session.user.email);
	return (
		<ReduxProviders
			chats={chats}
			lang={lang}
			clipboards={clipboards}
			user={user}>
			<div className='flex flex-col w-full lg:flex-row h-[calc(100dvh-5rem)] gap-7 lg:gap-10'>
				<Sidebar />
				<main className='flex flex-col gap-7 flex-1 lg:min-h-full max-w-full'>
					<Header />
					<div className='flex-1'>{children}</div>
					<Footer />
				</main>
			</div>
		</ReduxProviders>
	);
}
