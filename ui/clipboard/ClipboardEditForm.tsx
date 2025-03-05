'use client';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FiEdit3 } from 'react-icons/fi';
import { updateClipboardThunk } from '@/libs/features/clipboards/clipboardSlice';
import { useAppDispatch } from '@/hooks/hooks';

type TReq = {
	content: string;
};

function ClipboardEditForm({
	id,
	text,
	setEditMode,
}: {
	id: string;
	text: string;
	setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const { register, handleSubmit } = useForm<TReq>();
	const dispatch = useAppDispatch();

	const onSubmit: SubmitHandler<TReq> = (data) => {
		toast.promise(
			(async () => {
				try {
					await dispatch(updateClipboardThunk({ content: data.content, id }));
					setEditMode(false);
				} catch (err) {
					console.log(err);
				}
			})(),
			{
				pending: 'pending',
				success: 'success',
				error: 'error',
			}
		);
	};
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex items-center w-full'>
			<input
				type='text'
				className='w-[calc(100%-2.25rem)] outline-0 pr-2'
				{...register('content', { required: true, value: text })}
			/>
			<button
				type='submit'
				className='text-[0px] w-9 h-9 leading-0 bg-gray-200 dark:bg-[var(--foreground)] rounded-xl shrink-0  flex items-center justify-center'>
				edit clipboard
				<FiEdit3 size={20} />
			</button>
		</form>
	);
}

export default React.memo(ClipboardEditForm);
