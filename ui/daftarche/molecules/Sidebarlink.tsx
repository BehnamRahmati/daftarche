"use client"
import { generateLocalePath } from "@/app/i18n";
import { useAppSelector } from "@/hooks/hooks";
import { selectLang } from "@/libs/features/global/langSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type TProp = {
	children: React.ReactNode;
	text: string;
	link: string;
	faText: string
};

function Sidebarlink({ children, text, link, faText }: TProp) {
	const pathname = usePathname();
	const lang = useAppSelector(selectLang)
	const classNames =  pathname.endsWith(link) ? "bg-gray-100 dark:bg-[var(--foreground)] font-bold" : ""
	
	return (
		<Link href={generateLocalePath(lang, link)} className={`flex gap-1 items-center lg:justify-start justify-center lg:gap-4 flex-1 px-2 lg:px-5 py-4 hover:bg-gray-100 dark:hover:bg-[var(--foreground)] lg:rounded-3xl ${classNames}`} >
			{children}
			<p className="text-xs lg:text-base">{lang === 'fa' ? faText :text}</p>
		</Link>
	);
}

export default React.memo(Sidebarlink)