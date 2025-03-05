import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import SessionProviders from '@/ui/SessionProviders';

const poppins = Poppins({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Daftarche',
	description: 'This is daftarche',
};

type TProps = Readonly<{
	children: React.ReactNode;
	params: Promise<{ lang: 'fa' | 'en' }>;
}>;

export default async function RootLayout({ children }: TProps) {
	
	return (
		<html lang='en'>
			<body className={`${poppins.className} root-layout`}>
				<SessionProviders>{children}</SessionProviders>
				<ToastContainer
					position='bottom-left'
					autoClose={1000}
				/>
			</body>
		</html>
	);
}
