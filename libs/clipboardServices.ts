import { prisma } from './prisma';
import CryptoJS from 'crypto-js';

export async function updatingClipboard(content: string, id: string) {
	// encrypting content
	const encryptedContent = CryptoJS.AES.encrypt(content, process.env.ENCRYPTION_SECRET!).toString();

	// updating content in db with new encripted data
	const newClipboard = await prisma.clipboard.update({
		where: { id },
		data: { content: encryptedContent },
	});
	if (!newClipboard) {
		return null;
	}
	return {
		id: newClipboard.id,
		content: CryptoJS.AES.decrypt(newClipboard.content, process.env.ENCRYPTION_SECRET!).toString(
			CryptoJS.enc.Utf8
		),
		userid: newClipboard.userid,
		createdAt: newClipboard.createdAt,
		updatedAt: newClipboard.updatedAt,
	};
}

export async function deletingClipboard(id: string) {
	// deleting clipboard from db
	return await prisma.clipboard.delete({ where: { id } });
}

export async function creatingClipboard({ content, email }: { content: string; email: string }) {
	// encripting content
	const encryptedContent = CryptoJS.AES.encrypt(content, process.env.ENCRYPTION_SECRET!).toString();

	// creating new clipboard in db
	const newClipboard = await prisma.clipboard.create({
		data: { content: encryptedContent, user: { connect: { email } } },
	});

	if (!newClipboard) {
		return null;
	}

	return {
		id: newClipboard.id,
		content: CryptoJS.AES.decrypt(newClipboard.content, process.env.ENCRYPTION_SECRET!).toString(
			CryptoJS.enc.Utf8
		),
		userid: newClipboard.userid,
		createdAt: newClipboard.createdAt,
		updatedAt: newClipboard.updatedAt,
	};
}

export async function findingAllUserClipboards(email: string) {
	// getting all user's clipboards using email
	const clipboards = await prisma.clipboard.findMany({
		where: { user: { email } },
	});

	if (!clipboards || clipboards.length === 0) {
		return null;
	}

	// return decripted array of clipboards
	return clipboards.map((clip) => ({
		id: clip.id,
		content: CryptoJS.AES.decrypt(clip.content, process.env.ENCRYPTION_SECRET!).toString(
			CryptoJS.enc.Utf8
		),
		userid: clip.userid,
		createdAt: clip.createdAt,
		updatedAt: clip.updatedAt,
	}));
}
