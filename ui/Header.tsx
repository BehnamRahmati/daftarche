import React from "react";
import GoBackButton from "./GoBackButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AuthButton from "./AuthButton";
import Image from "next/image";

export default async function Header() {
	const session = await getServerSession(authOptions);

	return (
		<header>
			<div className='pt-10 pb-5 flex items-center justify-between'>
				<GoBackButton />
				<div className='flex items-center gap-2'>
					<div className='bg-gray-200 rounded-full h-10 w-10'>
						<Image
            className="w-full h-full rounded-full"
							src={session?.user?.image!}
							alt={session?.user?.name!}
							width={30}
							height={30}
						/>
					</div>
          <div className="flex flex-col">
          <p className='text-sm'>{session?.user?.name}</p>
					<AuthButton />
          </div>
					
				</div>
			</div>
		</header>
	);
}
