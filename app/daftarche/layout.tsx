import React from "react";

import Sidebar from "@/ui/Sidebar";
import Header from "@/ui/Header";
import Footer from "@/ui/Footer";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/_Authoptions";
import AuthButton from "@/ui/AuthButton";

export default async function DaftarcheLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);

	if (!session) {
		return (
			<div>
				<div className='grid place-content-center h-screen w-screen p-10'>
					<div className='bg-gray-100 w-xs rounded-xl p-5 flex flex-col items-center'>
						<p className="text-2xl font-bold text-center mb-5">Sign in to Daftarche</p>
						<AuthButton />
					</div>
				</div>
			</div>
		);
	}

	return (
		<html>
			<body>
				<Sidebar />
				<main className='flex flex-col min-h-dvh w-full max-w-[calc(100%-16rem)] pr-5'>
					<Header />
					<div className='flex-1 p-10 border border-gray-200 rounded-3xl'>
						{children}
					</div>
					<Footer />
				</main>
			</body>
		</html>
	);
}
