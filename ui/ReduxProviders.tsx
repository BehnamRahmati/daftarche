'use client';
import { initiateChat } from '@/libs/features/chats/chatSlice';
import { initiateClipboards } from '@/libs/features/clipboards/clipboardSlice';
import { initiateLang } from '@/libs/features/global/langSlice';
import { initiateTheme } from '@/libs/features/global/themeSlice';
import { initiateUser } from '@/libs/features/users/userSlice';
import { AppStore, makeStore } from '@/libs/store';
import { clipboard, TConversation, TUser } from '@/types/api';
import { useRef, useState } from 'react';
import { Provider } from 'react-redux';

type TProp = {
	children: React.ReactNode;
	clipboards: clipboard[];
	user: TUser;
	lang: 'en' | 'fa';
	chats: TConversation[]
};

export default function ReduxProviders({ children, clipboards, user, lang ,chats}: TProp) {
	const storeRef = useRef<AppStore | null>(null);
	const [localTheme] = useState<string>(() => {
		if (typeof window !== 'undefined' && localStorage) {
			const theme = localStorage.getItem('theme') || '';
			document.documentElement.classList.toggle('dark', theme === 'dark');
			return theme;
		}
		return '';
	});
	const [localLang] = useState<string>(() => {
		if (typeof window !== 'undefined') {
			document.documentElement.lang = lang;
			document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
		}
		return ''; 
	});

	if (!storeRef.current) {
		// Create the store instance the first time this renders
		storeRef.current = makeStore();
		storeRef.current.dispatch(initiateUser(user));
		storeRef.current.dispatch(initiateClipboards(clipboards));
		storeRef.current.dispatch(initiateTheme(localTheme));
		storeRef.current.dispatch(initiateLang(lang));
		storeRef.current.dispatch(initiateChat(chats));
	}

	return <Provider store={storeRef.current}>{children}</Provider>;
}
