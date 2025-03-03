"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FiArrowLeft } from "react-icons/fi";
export default function GoBackButton() {
	const router = useRouter();
	const pathname = usePathname()
	if(pathname === "/") return ""
	return (
		<button type="button" onClick={() => router.back()}className='p-3 text-[0px] cursor-pointer rounded-xl bg-gray-200'>
			go back
			<FiArrowLeft size={20}  />
		</button>
	);
}
