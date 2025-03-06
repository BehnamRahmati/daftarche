import ConversationsTable from '@/ui/chat/ConversationsTable';
import React from 'react';

export default async function Chat({ params }: { params: Promise<{ lang: 'en' | 'fa' }> }) {
	const { lang } = await params;
	return (
		<div>
			<h2 className='text-xl font-bold mb-5'>{lang === 'fa' ? 'آخرین گفتگو ها :' : 'latest coversations :'}</h2>
			<ConversationsTable />
		</div>
	);
}
