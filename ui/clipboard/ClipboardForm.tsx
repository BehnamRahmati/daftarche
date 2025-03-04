"use client";
import { createNewClipboard } from "@/libs/api";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import ClipboardPasteButton from "./atoms/buttons/ClipboardPasteButton";
import ClipboardInput from "./atoms/inputs/ClipboardInput";

type TReq = {
	content: string;
};

function ClipboardForm({ email }: { email: string }) {
	const { register, handleSubmit, setValue } = useForm<TReq>();

	console.warn("clipboard form rendered");

	const onSubmit: SubmitHandler<TReq> = (data) => {
		toast.promise(
			(async () => {
				const formValues = { content: data.content, email };
				const result = await createNewClipboard(formValues);
				console.log(result);
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
			className={classnames.clipboardForm}
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className={classnames.inputWrapper}>
				{/* cloipbord form  input  */}
				<ClipboardInput
					register={register}
					label='content'
					placeholder='paste or write your text here ...'
					required={true}
				/>

				{/* clipboard form paste button */}
				<ClipboardPasteButton setValue={setValue} />
			</div>

			{/* clipboard form submit button */}
			<button className={classnames.clipboardSubmitBtn} type='submit'>
				Add
				<FiPlus size={20} />
			</button>
		</form>
	);
}

export default React.memo(ClipboardForm);

const classnames = {
	clipboardForm:
		"flex items-center justify-center w-full bg-white px-3 pb-3 lg:py-10 gap-2 fixed lg:static bottom-0 left-0 z-10",
	inputWrapper:
		"flex items-center flex-1 border-2 border-gray-200 h-12 rounded-2xl overflow-hidden",
	clipboardInput: "h-12 w-[calc(100%-3rem)] px-4 outline-0 ",
	clipboardSubmitBtn:
		"bg-gray-100 h-12 px-3 rounded-xl curspor-pointer text-[0px]",
};
