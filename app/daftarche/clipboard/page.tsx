
import { authOptions } from "@/app/api/auth/[...nextauth]/_Authoptions";
import ClipboardForm from "@/ui/ClipboardForm";
import ClipboardTable from "@/ui/ClipboardTable";

import { getServerSession } from "next-auth/next";

export default async function Clipboard() {
	const session = await getServerSession(authOptions);

	if (!session || !session.user) {
		return <div>Error: User not authenticated</div>;
	}

	return (
		<div>
			<h1 className='text-3xl text-center font-bold'>Clipboard</h1>
			{session.user.email && (
				<>
					<ClipboardForm email={session.user.email} />
					<ClipboardTable email={session.user.email} />
				</>
			)}
		</div>
	);
}
