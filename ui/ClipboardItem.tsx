"use client";
import React, { useLayoutEffect } from "react";
import { FiEdit, FiCopy, FiMoreHorizontal } from "react-icons/fi";
import ClipboardDeleteButton from "./ClipboardDeleteButton";
import ClipboardEditForm from "./ClipboardEditForm";
import { poppins } from "./AccountDropdown";
import Dropdown from "rc-dropdown";
export default function ClipboardItem({
	text,
	id,
}: {
	text: string;
	id: string;
}) {
	const [editMode, setEditMode] = React.useState(false);
	const [responseive, setResponsive] = React.useState(false);
	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(text);
		} catch (err) {
			console.log("failed to copy to clipboard");
		}
	};

	useLayoutEffect(() => {
		const dvw = window.innerWidth;
		if (dvw < 1024) {
			setResponsive(true);
		}
	}, []);
	return (
		<div className='flex *:px-5 *:py-3 divide-x divide-gray-200'>
			<div className=' flex-1 truncate'>
				{editMode ? (
					<ClipboardEditForm id={id} text={text} setEditMode={setEditMode} />
				) : (
					text
				)}
			</div>

			{responseive ? (
				<Dropdown
					trigger={["click"]}
					animation='slide-up'
					overlay={
						<ActionDropdown
							id={id}
							handleCopy={handleCopy}
							setEditMode={setEditMode}
						/>
					}
				>
					<button type='button' className='text-[0px] leading-0 w-20 flex justify-center'>
						action
						<FiMoreHorizontal size={20} />
					</button>
				</Dropdown>
			) : (
				<div className='w-32 hidden lg:flex items-center gap-2'>
					<FiEdit size={20} onClick={() => setEditMode(!editMode)} />
					<FiCopy
						className='cursor-pointer'
						onClick={() => handleCopy()}
						size={20}
					/>
					<ClipboardDeleteButton id={id} />
				</div>
			)}
		</div>
	);
}

type TProps = {
	id: string;
	setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
	handleCopy: () => Promise<void>;
};

const ActionDropdown = ({ setEditMode, handleCopy, id }: TProps) => {
	return (
		<div
			className={`${poppins.className} overflow-hidden flex flex-col bg-white *:py-3 *:px-2 divide-y divide-gray-200 rounded-xl border border-gray-200 *:flex *:hover:bg-gray-100`}
		>
			<button type="button" className="flex gap-1 text-base">
			<FiEdit size={20} onClick={() => setEditMode((prev: boolean) => !prev)} />
				edit
			</button>
			<button type="button" className="flex gap-1 text-base">
			<FiCopy
				className='cursor-pointer'
				onClick={() => handleCopy()}
				size={20}
			/>
			copy
			</button>
			
			
			<ClipboardDeleteButton id={id} />
		</div>
	);
};
