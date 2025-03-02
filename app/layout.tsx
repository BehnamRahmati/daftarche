import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import Providers from "@/ui/Providers";

const poppins = Poppins({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	style: ["normal", "italic"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Daftarche",
	description: "This is daftarche",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${poppins.className} root-layout`}>
				<Providers>{children}</Providers>
				<ToastContainer position='bottom-left' autoClose={1000} />
			</body>
		</html>
	);
}
