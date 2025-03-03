import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ClipboardForm from "@/ui/ClipboardForm";
import ClipboardTable from "@/ui/ClipboardTable";

import { getServerSession } from "next-auth/next";

export default async function Clipboard() {
	const session = await getServerSession(authOptions);

	return (
		<div>
			<h1 className='text-3xl text-center font-bold'>Clipboard</h1>
			<ClipboardForm email={session?.user?.email!} />
			<ClipboardTable email={session?.user?.email!} />
		</div>
	);
}
