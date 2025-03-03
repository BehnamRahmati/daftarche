"use client";
import React from "react";
import { FiEdit, FiCopy } from "react-icons/fi";
import ClipboardDeleteButton from "./ClipboardDeleteButton";
import ClipboardEditForm from "./ClipboardEditForm";
export default function ClipboardItem({
	text,
	id,
}: {
	text: string;
	id: string;
}) {
	const [editMode , setEditMode] = React.useState(false)
	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(text);
		} catch (err) {
			console.log("failed to copy to clipboard");
		}
	};
	return (
		<div className='flex *:px-5 *:py-3 divide-x divide-gray-200'>
			<div className=' flex-1 truncate'>
				{
					editMode
						? <ClipboardEditForm id={id} text={text} setEditMode={setEditMode} />
						: text
				}
			</div>
			<div className='w-32 flex items-center gap-2'>
				<FiEdit size={20} onClick={() => setEditMode(!editMode)} />
				<FiCopy className="cursor-pointer" onClick={() => handleCopy()} size={20} />
				<ClipboardDeleteButton id={id} />
			</div>
		</div>
	);
}
