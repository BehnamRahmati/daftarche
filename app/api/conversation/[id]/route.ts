import { prisma } from '@/libs/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contentSchema = z
	.string()
	.min(1, 'content is too short')
	.max(500, 'content is too long')
	.refine((val) => !/<.*?>/.test(val), 'Invalid input: HTML tags not allowed');

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	// clipboard id
	const { id } = await params;

	// new content
	const { content, senderId } = (await req.json()) as { content: string; senderId: string };
	const validContent = contentSchema.safeParse(content);

	if (!validContent.success) {
		return NextResponse.json({ message: validContent.error }, { status: 500 });
	}

	const newMessage = await prisma.message.create({
		data: {
			content,
			sender: { connect: { id: senderId } },
			conversation: { connect: { id: id } },
		},
	});

	if (!newMessage) {
		return NextResponse.json({ message: 'no message' }, { status: 500 });
	}

	const conversation = await prisma.conversation.findUnique({
		where: { id },
		include: {
			participants: {
				include: { user: true },
			},
			messages: {
				orderBy: { createdAt: 'desc' }
			},
		},
	});

	return NextResponse.json(conversation, { status: 200 });
}
