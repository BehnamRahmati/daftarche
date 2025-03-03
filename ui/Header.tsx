import React from "react";
import GoBackButton from "./GoBackButton";
import { getServerSession } from "next-auth";
import { FiBell } from "react-icons/fi";
import AccountDropdown from "./AccountDropdown";
import { authOptions } from "@/app/api/auth/[...nextauth]/_Authoptions";

export default async function Header() {
	const session = await getServerSession(authOptions);
	return (
		<header>
			<div className='pt-10 pb-5 flex items-center justify-between'>
				<div className='flex items-center gap-2'>
					<GoBackButton />
					<div className='h-10 w-3xs text-gray-300 border leading-10 border-gray-300 rounded-xl px-2'>
						search ...
					</div>
				</div>

				<div className='flex items-center gap-2'>
					<div className='bg-gray-200 rounded-xl w-10 h-10 flex items-center justify-center'>
						<FiBell size={20} />
					</div>
					<AccountDropdown
						image={session?.user?.image!}
						name={session?.user?.name!}
					/>
				</div>
			</div>
		</header>
	);
}
