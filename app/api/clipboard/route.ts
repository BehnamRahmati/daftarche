import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const email = searchParams.get("email");

	if (email) {
		const clipboards = await prisma.clipboard.findMany({
			where: { user: { email } },
		});

		if (!clipboards) {
			return NextResponse.json(
				{ message: "failed to find clipboards" },
				{ status: 500 }
			);
		}
		return NextResponse.json(clipboards, { status: 200 });
	}

	return NextResponse.json({ message: "failed" }, { status: 500 });
}

export async function POST(req: NextRequest) {
	const data = await req.json();
	if (!data) {
		return NextResponse.json({ message: "no data found!" }, { status: 500 });
	}
	const { content, email } = data;
	const newClipboard = await prisma.clipboard.create({
		data: { content, user: { connect: { email } } },
	});
	if (!data) {
		return NextResponse.json(
			{ message: "faild to create new clipboard" },
			{ status: 500 }
		);
	}
	return NextResponse.json(
		{ message: "success", newClipboard },
		{ status: 200 }
	);
}
