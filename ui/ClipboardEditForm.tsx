"use client";
import { editClipboard } from "@/libs/api";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FiEdit3 } from "react-icons/fi";

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
	setEditMode :React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const { register, handleSubmit } = useForm<TReq>();

	const onSubmit: SubmitHandler<TReq> = (data) => {
		toast.promise(
			(async () => {
				const result = await editClipboard(data.content, id);
				setEditMode(false)
			})(),
			{
				pending: "pending",
				success: "success",
				error: "error",
			}
		);
	};
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex items-center w-full'
		>
			<input
				type='text'
				className='w-[calc(100%-2.25rem)] outline-0 pr-2'
				{...register("content", { required: true, value: text })}
			/>
			<button
				type='submit'
				className='text-[0px] w-9 h-9 leading-0 bg-gray-200 rounded-xl shrink-0  flex items-center justify-center'
			>
				edit clipboard
				<FiEdit3 size={20} />
			</button>
		</form>
	);
}

export default React.memo(ClipboardEditForm)