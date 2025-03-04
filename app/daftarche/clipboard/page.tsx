
import { authOptions } from "@/libs/auth";
import ClipboardForm from "@/ui/clipboard/ClipboardForm";
import ClipboardTable from "@/ui/clipboard/ClipboardTable";

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
