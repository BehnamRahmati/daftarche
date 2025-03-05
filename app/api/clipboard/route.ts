import { NextRequest, NextResponse } from 'next/server';
import { creatingClipboard, findingAllUserClipboards } from '@/libs/clipboardServices';
import { z } from 'zod';



const clipbordSchema = z.object({
	email : z.string().min(1, "email is too short").email(),
	content : z.string().min(1, "content is too short").max(500, "content is too long").refine((val) => !/<.*?>/.test(val), "Invalid input: HTML tags not allowed"),
})

export async function GET(req: NextRequest) {

	const { searchParams } = new URL(req.url);
	const email = searchParams.get('email');

	if (email) {

		const clipboards = await findingAllUserClipboards(email);

		if (!clipboards) {
			return NextResponse.json([], { status: 500 });
		}

		return NextResponse.json(clipboards, { status: 200 });
	}

	return NextResponse.json({ message: 'failed' }, { status: 500 });
}



export async function POST(req: NextRequest) {
	// recieving data
	const data: { content: string; email: string } = await req.json();
	const validData = clipbordSchema.safeParse(data)


	// if empty data respond with error
	if (!validData.success) {
		return NextResponse.json({ message: validData.error }, { status: 500 });
	}

	// creating new clipboard
	const newClipboard = await creatingClipboard(data);

	// if failed to create new clip respond with error
	if (!data) {
		return NextResponse.json({ message: 'faild to create new clipboard' }, { status: 500 });
	}

	// if success respond with success
	return NextResponse.json(newClipboard, { status: 200 });
}
