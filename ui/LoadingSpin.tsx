'use client';
import React, { useEffect, useState } from 'react';
import { ImSpinner10 } from 'react-icons/im';
export default function LoadingSpin() {
	const [animateOut, setAnimateOut] = useState(false);


	return (
		<div
			className='bg-white h-dvh w-dvw dark:bg-[var(--background)] grid place-content-center'>
			<ImSpinner10
				className='animate-spin'
				size={70}
			/>
		</div>
	);
}
