"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type TProp = {
	children: React.ReactNode;
	text: string;
	link: string
};

export default function Sidebarlink({ children, text, link }: TProp) {
	const pathname = usePathname();
	const classNames =  pathname.endsWith(link) ? "bg-gray-100 font-bold" : ""
	
	return (
		<Link href={link} className={`flex gap-4 px-5 py-4 hover:bg-gray-100 rounded-3xl ${classNames}`} >
			{children}
			<p>{text}</p>
		</Link>
	);
}
