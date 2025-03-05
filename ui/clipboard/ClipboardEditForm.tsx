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
			className='flex items-center w-full border border-dashed rounded-md border-zinc-300 dark:border-[var(--secondary-dark)]'>
			<input
				type='text'
				className='w-[calc(100%-2rem)] outline-0 p-2'
				{...register('content', { required: true, value: text })}
			/>
			<button
				type='submit'
				className='text-[0px] leading-0 cursor-pointer'>
				edit clipboard
				<FiEdit3 size={20} />
			</button>
		</form>
	);
}

export default React.memo(ClipboardEditForm);
