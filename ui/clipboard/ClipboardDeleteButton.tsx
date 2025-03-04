"use client";
import { deleteUserClipboard } from "@/libs/api";
import React, { useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

export default function ClipboardDeleteButton({ id }: { id: string }) {
	const { handleSubmit } = useForm();
	const [responsive, setResponsive] = React.useState(false);
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
				<span className='lg:hidden text-sm ml-1'>delete</span>
			</button>
		</form>
	);
}
