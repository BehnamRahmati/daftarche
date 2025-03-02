"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FiArrowLeft } from "react-icons/fi";
export default function GoBackButton() {
	const router = useRouter();
	const pathname = usePathname()
	if(pathname === "/") return ""
	return (
		<div onClick={() => router.back()}className='p-3 cursor-pointer rounded-full bg-gray-200'>
			<FiArrowLeft size={20}  />
		</div>
	);
}
