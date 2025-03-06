'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FiNavigation } from 'react-icons/fi';
import { addNewMessageThunk } from '@/libs/features/chats/chatSlice';
import { selectLang } from '@/libs/features/global/langSlice';
import { selectUser } from '@/libs/features/users/userSlice';
type TReq = {
	content: string;
	conversationId: string;
};

export default function ConversationForm({ chatId }: { chatId: string }) {
	const { register, handleSubmit } = useForm<TReq>();
	const dispatch = useAppDispatch();
	const lang = useAppSelector(selectLang);
	const {user} = useAppSelector(selectUser);

	if(!user || !lang) return <p>no user ot lang</p>

	const onSubmit: SubmitHandler<TReq> = (data) => {
		toast.promise(
			(async () => {
				try {
					await dispatch(addNewMessageThunk({content: data.content , conversationId: chatId, senderId: user.id}));
				} catch (err) {
					console.log(err);
				}
			})(),
			{
				pending: lang === 'fa' ? 'در حال ارسال متن شما.' : 'sending request',
				success: lang === 'fa' ? 'متن شما با موفقیت ارسال شد' : 'successfullry created new clipboard',
				error: lang === 'fa' ? 'شکست در ارسال متن' : 'failed to create clipboard',
			}
		);
	};
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex items-center gap-3 mt-5'>
			<div className='input-wrapper'>
				<input
					className='text-input'
					type='text'
					{...register('content', { required: true })}
				/>
			</div>

			<button
				className='button-primary'
				type='submit'>
				send message
				<FiNavigation className='text-sm lg:text-xl' />
			</button>
		</form>
	);
}
