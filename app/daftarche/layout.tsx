import React from "react";

import Sidebar from "@/ui/Sidebar";
import Header from "@/ui/Header";
import Footer from "@/ui/Footer";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AuthButton from "@/ui/AuthButton";

export default async function DaftarcheLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);

	if (!session) {
		return (
			<div className='h-screen w-screen grid place-content-center'>
				<div>
					<h1 className='text-5xl font-bold underline italic mb-5'>
						Daftarche
					</h1>
					<AuthButton />
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
