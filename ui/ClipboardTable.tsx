"use client";
import { fetchUserClipboards } from "@/libs/api";
import React from "react";
import useSWR from "swr";
import ClipboardItem from "@/ui/ClipboardItem";

export default function ClipboardTable({ email }: { email: string }) {
	const { data: clipboards, isLoading } = useSWR(email, fetchUserClipboards, {
		refreshInterval: 1000,
	});
	if(isLoading) return <p className="border border-gray-200 text-gray-500 p-10 text-center rounded-2xl">Please wait while we are loading your clipboards.</p>;
	if (!clipboards) return <p className="border border-gray-200 text-gray-500 p-10 text-center rounded-2xl">You have no clipboard ath the moment!</p>;
	return (
		<div className='w-full flex flex-col divide-y divide-gray-200 border border-gray-200 rounded-3xl'>
			<div className='flex *:p-5 divide-x divide-gray-200 *:font-bold'>
				<div className='flex-1'>Content</div>
				<div className='w-32'>Action</div>
			</div>

			{clipboards?.length ? (
				clipboards.map((clipboard) => (
					<ClipboardItem id={clipboard.id} text={clipboard.content} key={clipboard.id} />
				))
			) : (
				<p className='text-center p-5'>no item found!</p>
			)}
		</div>
	);
}
