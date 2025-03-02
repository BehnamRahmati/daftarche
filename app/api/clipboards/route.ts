import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const clipboards = await prisma.clipboard.findMany();
	if (!clipboards) {
		return NextResponse.json(
			{ message: "failed to find clipboards" },
			{ status: 500 }
		);
	}
	return NextResponse.json(clipboards, { status: 200 });
}

export async function POST(req: Request) {
	const data = await req.json();
	if (!data) {
		return NextResponse.json({ message: "no data found!" }, { status: 500 });
	}
	const { content, userid } = data;
	const newClipboard = await prisma.clipboard.create({
		data: { content, userid },
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
