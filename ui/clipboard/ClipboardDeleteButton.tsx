"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { deleteClipboardThunk } from "@/libs/features/clipboards/clipboardSlice";
import { selectLang } from "@/libs/features/global/langSlice";
import React, { useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

export default function ClipboardDeleteButton({ id }: { id: string }) {
	const { handleSubmit } = useForm();
	const [responsive, setResponsive] = React.useState(false);
	const lang = useAppSelector(selectLang)

	const dispath = useAppDispatch()
	const onSubmit = () => {
		toast.promise(
			(async () => {
				 await dispath(deleteClipboardThunk(id))
			})(),
			{
				pending: lang === 'fa' ? 'در حال پاک کردن.' : 'removing...',
				success: lang === 'fa' ? 'با موفقیت پاک شد.' : 'successfully removed clipboard',
				error: lang === 'fa' ? 'عملیات حذف شکست خورد.' : 'failed to remove clipboard',
			}
		);
	};

	useLayoutEffect(() => {
		const dvw = window.innerWidth;
		if (dvw < 1024) {
			setResponsive(true);
		}
	}, []);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<button
				type='submit'
				className='text-[0px] cursor-pointer leading-0 flex items-center  justify-center'
			>
				delete clipboard
				{responsive ? <FiTrash2 size={15} /> : <FiTrash2 size={20} />}
				<span className='lg:hidden text-sm ml-1'>{lang === 'fa' ? 'حذف' : 'delete'}</span>
			</button>
		</form>
	);
}
