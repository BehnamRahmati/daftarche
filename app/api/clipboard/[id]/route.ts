import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function PUT(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const { id } = await params;
	const content = await req.json();

	const clipboard = await prisma.clipboard.update({
		where: { id },
		data: { content },
	});
	if (!clipboard) {
		return NextResponse.json({ message: "failed" }, { status: 500 });
	}
	return NextResponse.json({ message: "success" }, { status: 200 });
}

export async function DELETE(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const { id } = await params;
	const user = await prisma.clipboard.delete({ where: { id } });
	if (!user) {
		return NextResponse.json({ message: "failed" }, { status: 500 });
	}
	return NextResponse.json({ message: "success" }, { status: 200 });
}
