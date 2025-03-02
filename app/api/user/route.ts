import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(
	req: Request,
	{ params }: { params: Promise<{ email: string }> }
) {
	const { email } = await params;
	const user = await prisma.user.findUnique({ where: { email } });
	if (!user) {
		return NextResponse.json({ message: "failed" }, { status: 500 });
	}

	return NextResponse.json(user, { status: 200 });
}
