"use client";
import { useAppSelector } from "@/hooks/hooks";
import { selectLang } from "@/libs/features/global/langSlice";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
export default function GoBackButton() {
	const router = useRouter();
	const lang = useAppSelector(selectLang)
	const pathname = usePathname()
	if(pathname === "/") return ""
	return (
		<button type="button" onClick={() => router.back()}className='p-3 text-[0px] cursor-pointer rounded-xl bg-gray-200 dark:bg-[var(--foreground)]'>
			go back
			{
				lang === 'fa' ? <FiArrowRight size={20}  /> : <FiArrowLeft size={20}  />
			}
			
		</button>
	);
}
