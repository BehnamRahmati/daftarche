"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type TProp = {
	children: React.ReactNode;
	text: string;
	link: string
};

function Sidebarlink({ children, text, link }: TProp) {
	const pathname = usePathname();
	const classNames =  pathname.endsWith(link) ? "bg-gray-100 font-bold" : ""
	
	return (
		<Link href={link} className={`flex gap-1 items-center lg:justify-start justify-center lg:gap-4 flex-1 px-2 lg:px-5 py-4 hover:bg-gray-100 lg:rounded-3xl ${classNames}`} >
			{children}
			<p className="text-xs lg:text-base">{text}</p>
		</Link>
	);
}

export default React.memo(Sidebarlink)