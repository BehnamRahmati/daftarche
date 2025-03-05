import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	
	const { searchParams } = new URL(req.url);
	const email = searchParams.get('email');

	if (email) {
		const user = await prisma.user.findUnique({ where: { email } });

		if (!user) {
			return NextResponse.json({ message: "failed" }, { status: 500 });
		}

		return NextResponse.json(user, { status: 200 });
	}

	return NextResponse.json({ message: "failed" }, { status: 500 });
}
