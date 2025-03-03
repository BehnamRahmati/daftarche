"use client";

import { createNewClipboard } from "@/libs/api";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FiPlus, FiClipboard } from "react-icons/fi";
import { toast } from "react-toastify";
type TReq = {
	content: string;
};

export default function ClipboardForm({email} : {email:string}) {
	const { register, handleSubmit, setValue } = useForm<TReq>();

	const handlePasteFromClipboard = async () => {
		try {
			// Read text from the clipboard
			const text = await navigator.clipboard.readText();
			//set content value from clipboard
			setValue("content", text);
		} catch (err) {
			console.error("Failed to read clipboard contents: ", err);
		}
	};

	const onSubmit: SubmitHandler<TReq> = (data) => {
		toast.promise((async () => {
			const formValues = {content: data.content , email }
			const result = await createNewClipboard(formValues)
			console.log(result);
			
		})(), {
			pending: "pending",
			success: "success",
			error : "error"
		})
	}

	return (
		<form
			className='flex items-center justify-center py-10 gap-2'
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className='flex items-center flex-1 border-2 border-gray-200 h-10 rounded-2xl overflow-hidden'>
				<input
					type='text'
                    placeholder="paste or write your text here ..."
					className='h-10 flex-1 px-4 outline-0'
					{...register("content", { required: true })}
				/>
				<button
					onClick={() => handlePasteFromClipboard()}
					className='bg-gray-100 h-10 px-3 rounded-xl curspor-pointer text-[0px]'
					type='button'
				>
					paste from clipboard <FiClipboard size={20} />{" "}
				</button>
			</div>

			<button
				className='bg-gray-100 h-10 px-3 rounded-xl curspor-pointer text-[0px]'
				type='submit'
			>
				Add
				<FiPlus size={20} />
			</button>
		</form>
	);
}
