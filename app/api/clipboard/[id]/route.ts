import { deletingClipboard, updatingClipboard } from '@/libs/clipboardServices';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contentSchema = z.string()
.min(1, "content is too short")
.max(500, "content is too long")
.refine((val) => !/<.*?>/.test(val), "Invalid input: HTML tags not allowed")


// updating clipboard content in db
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {

	// clipboard id
	const { id } = await params;

	// new content
	const content = await req.json();
	const validContent = contentSchema.safeParse(content)

	if (!validContent.success) {
		return NextResponse.json({ message: validContent.error }, { status: 500 });
	}

	// updating clipboard
	const clipboard = await updatingClipboard(content, id);

	// if updating failed respond error
	if (!clipboard) {
		return NextResponse.json({ message: 'failed' }, { status: 500 });
	}

	// if updating succeeded respond success
	return NextResponse.json(clipboard, { status: 200 });
}

//deleting clipboard from db
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	// clipboard id
	const { id } = await params;

	// deleting clipboard
	const user = await deletingClipboard(id);

	// if deleting failed respond error
	if (!user) {
		return NextResponse.json({ message: 'failed' }, { status: 500 });
	}

	// if deleting succeeded respond success

	return NextResponse.json(user, { status: 200 });
}
