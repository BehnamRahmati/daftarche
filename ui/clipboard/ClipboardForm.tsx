'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';
import ClipboardPasteButton from './atoms/buttons/ClipboardPasteButton';
import ClipboardInput from './atoms/inputs/ClipboardInput';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { addNewClipboardThunk } from '@/libs/features/clipboards/clipboardSlice';
import { selectUser } from '@/libs/features/users/userSlice';
import { selectLang } from '@/libs/features/global/langSlice';

type TReq = {
	content: string;
};

const contentSchema = z.object({
	content: z
		.string()
		.min(1, 'Input can not be empty.')
		.max(500, 'Content is too long')
		.refine((val) => !/<.*?>/.test(val), 'Invalid input: HTML tags not allowed'),
});

function ClipboardForm() {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<TReq>({
		resolver: zodResolver(contentSchema), // Use Zod as the resolver
	});

	const dispatch = useAppDispatch();
	const { user } = useAppSelector(selectUser);
	const lang = useAppSelector(selectLang);
	if (!user) return <p>no user</p>;

	const onSubmit: SubmitHandler<TReq> = (data) => {
		toast.promise(
			(async () => {
				try {
					const formValues = { content: data.content, email: user.email };
					await dispatch(addNewClipboardThunk(formValues));
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
			className={classnames.clipboardForm}
			onSubmit={handleSubmit(onSubmit)}>
			<div className='flex flex-col flex-1'>
				<div className={classnames.inputWrapper}>
					{/* cloipbord form  input  */}
					<ClipboardInput
						register={register}
						label='content'
						placeholder={
							lang === 'fa'
								? 'متن مورد نظر خود را اینجا جای گذاری کنید.'
								: 'paste or write your text here ...'
						}
						required={true}
					/>
					{/* clipboard form paste button */}
					<ClipboardPasteButton setValue={setValue} />
				</div>
				<p className='text-red-500 px-3 mt-2'>{errors.content?.message}</p>
			</div>

			{/* clipboard form submit button */}
			<button
				className={classnames.clipboardSubmitBtn}
				type='submit'>
				Add
				<FiPlus size={20} />
			</button>
		</form>
	);
}

export default React.memo(ClipboardForm);

const classnames = {
	clipboardForm:
		'flex items-start justify-center w-full bg-white dark:bg-[var(--background)] px-3 pb-3 lg:py-10 gap-2 fixed lg:static bottom-0 left-0 z-10',
	inputWrapper:
		'flex items-center w-full border  dark:border-[var(--secondary)] border-gray-200 h-12 rounded-xl overflow-hidden',
	clipboardInput: 'h-12 w-[calc(100%-3rem)] px-4 outline-0 ',
	clipboardSubmitBtn:
		'bg-gray-100 dark:bg-[var(--foreground)] h-12 px-3 rounded-xl cursor-pointer text-[0px]',
};
