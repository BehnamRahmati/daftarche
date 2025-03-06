import { prisma } from '@/libs/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const email = searchParams.get('email');

	if (!email) {
		return NextResponse.json({ message: 'Missing required fields' }, { status: 500 });
	}

	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (!user) {
		return NextResponse.json({ message: 'User not found' }, { status: 500 });
	}

	const conversations = await prisma.conversation.findMany({
		where: {
			participants: {
				some: { userId: user.id },
			},
		},
		include: {
			participants: {
				include: { user: true },
			},
			messages: {
				orderBy: { createdAt: 'desc' },
				//take: 1,  Optionally include the last message in each conversation
			},
		},
	});

	return NextResponse.json(conversations, { status: 200 });
}

export async function POST(req: NextRequest) {
	const { senderId, recipientId, content } = await req.json();

	if (!senderId || !recipientId || !content) {
		return NextResponse.json({ message: 'Missing required fields' }, { status: 500 });
	}

	let conversation = await prisma.conversation.findFirst({
		where: {
			participants: {
				every: {
					OR: [{ userId: senderId }, { userId: recipientId }],
				},
			},
		},
		include: { participants: true },
	});

	// If no conversation exists, create a new one
	if (!conversation) {
		conversation = await prisma.conversation.create({
			data: {
				participants: {
					create: [
						{ userId: senderId }, // Add sender as a participant
						{ userId: recipientId }, // Add recipient as a participant
					],
				},
			},
			include: { participants: true },
		});
	}

	// Add a new message to the conversation
	const message = await prisma.message.create({
		data: {
			content,
			senderId,
			conversationId: conversation.id,
		},
		include: { sender: true, conversation: true },
	});

	return NextResponse.json({ conversation, message }, { status: 200 });
}
