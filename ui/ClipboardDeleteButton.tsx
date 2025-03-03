"use client";
import { deleteUserClipboard } from "@/libs/api";
import React from "react";
import { useForm } from "react-hook-form";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

export default function ClipboardDeleteButton({ id }: { id: string }) {
	const { handleSubmit } = useForm();

	const onSubmit = () => {
		toast.promise(
			(async () => {
				const result = await deleteUserClipboard(id);
			})(),
			{
				pending: "pending",
				success: "success",
				error: "error",
			}
		);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<button type='submit' className='text-[0px] cursor-pointer leading-0 flex items-center'>
				delete clipboard
				<FiTrash2 size={20} />
				<span className="lg:hidden text-base ml-1">delete</span>
			</button>
		</form>
	);
}
