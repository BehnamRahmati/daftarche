"use client";

import React from "react";
import ClipboardDeleteButton from "../../ClipboardDeleteButton";
import { FiCopy, FiEdit } from "react-icons/fi";
import { poppins } from "@/ui/AccountDropdown";

type TProps = {
	id: string;
	setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
	handleCopy: () => Promise<void>;
};

function ClipboardActionDropdown({ setEditMode, handleCopy, id }: TProps) {
	return (
		<div className={classnames.dropdown}>
			<button
				type='button'
				onClick={() => setEditMode((prev: boolean) => !prev)}
				className={classnames.dropdownItem}
			>
				<FiEdit size={15} />
				edit
			</button>
			<button
				type='button'
				onClick={() => handleCopy()}
				className={classnames.dropdownItem}
			>
				<FiCopy size={15} />
				copy
			</button>

			<ClipboardDeleteButton id={id} />
		</div>
	);
}

const classnames = {
	dropdown: `${poppins.className} overflow-hidden flex flex-col bg-white *:py-3 *:px-2 divide-y divide-gray-200 rounded-xl border border-gray-200 *:flex *:hover:bg-gray-100`,
	dropdownItem: "flex items-center justify-center gap-1 text-sm",
};

export default React.memo(ClipboardActionDropdown);
