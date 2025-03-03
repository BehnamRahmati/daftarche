"use client";
import React, { useLayoutEffect } from "react";
import { FiEdit, FiCopy, FiMoreHorizontal } from "react-icons/fi";
import ClipboardDeleteButton from "./ClipboardDeleteButton";
import ClipboardEditForm from "./ClipboardEditForm";
import { poppins } from "./AccountDropdown";
import Dropdown from "rc-dropdown";

function ClipboardItem({ text, id }: { text: string; id: string }) {
	const [editMode, setEditMode] = React.useState(false);
	const [responsive, setResponsive] = React.useState(false);
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
		<div className='flex *:px-3 lg:*:px-5 *:py-3 divide-x divide-gray-200'>
			<div className=' flex-1 truncate'>
				{editMode ? (
					<ClipboardEditForm id={id} text={text} setEditMode={setEditMode} />
				) : (
					text
				)}
			</div>

			{responsive ? (
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
					<button
						type='button'
						className='text-[0px] leading-0 w-20 flex justify-center'
					>
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

const ActionDropdown = React.memo(({ setEditMode, handleCopy, id }: TProps) => {
	return (
		<div
			className={`${poppins.className} overflow-hidden flex flex-col bg-white *:py-3 *:px-2 divide-y divide-gray-200 rounded-xl border border-gray-200 *:flex *:hover:bg-gray-100`}
		>
			<button
				type='button'
				onClick={() => setEditMode((prev: boolean) => !prev)}
				className='flex items-center justify-center gap-1 text-sm'
			>
				<FiEdit size={15} />
				edit
			</button>
			<button
				type='button'
				className='flex items-center justify-center gap-1 text-sm'
			>
				<FiCopy
					className='cursor-pointer'
					onClick={() => handleCopy()}
					size={15}
				/>
				copy
			</button>

			<ClipboardDeleteButton id={id} />
		</div>
	);
});

export default React.memo(ClipboardItem);
