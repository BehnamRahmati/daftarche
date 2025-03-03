"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
	const { data: session, status } = useSession();

	// if (status === "loading") {
	// 	return <p>Loading…</p>;
	// }

	if (session) {
		return (
			<div>
				<button
					className='cursor-pointer text-sm'
					type='button'
					onClick={() => signOut()}
				>
					Sign out
				</button>
			</div>
		);
	}

	return (
		<div>
			<button
				className='cursor-pointer bg-white  border border-gray-200  rounded-xl px-5 py-3'
				type='button'
				onClick={() => signIn("google")}
			>
				Sign in with Google
			</button>
		</div>
	);
}
