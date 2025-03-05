"use client";

import React from "react";
import ClipboardDeleteButton from "../../ClipboardDeleteButton";
import { FiCopy, FiEdit } from "react-icons/fi";
import { useAppSelector } from "@/hooks/hooks";
import { selectLang } from "@/libs/features/global/langSlice";

type TProps = {
	id: string;
	setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
	handleCopy: () => Promise<void>;
};

function ClipboardActionDropdown({ setEditMode, handleCopy, id }: TProps) {

	const lang = useAppSelector(selectLang)

	return (
		<div className={classnames.dropdown}>
			<button
				type='button'
				onClick={() => setEditMode((prev: boolean) => !prev)}
				className={classnames.dropdownItem}
			>
				<FiEdit size={15} />
				{lang === 'fa' ? 'ویرایش' : 'edit'}
			</button>
			<button
				type='button'
				onClick={() => handleCopy()}
				className={classnames.dropdownItem}
			>
				<FiCopy size={15} />
				{lang === 'fa' ? 'کپی' : 'copy'}
			</button>

			<ClipboardDeleteButton id={id} />
		</div>
	);
}

const classnames = {
	dropdown: `font-iranyekan overflow-hidden flex flex-col bg-white dark:bg-[var(--foreground)] *:py-3 *:px-2 divide-y divide-gray-200 rounded-xl border border-gray-200 *:flex *:hover:bg-gray-100`,
	dropdownItem: "flex items-center justify-center gap-1 text-sm",
};

export default React.memo(ClipboardActionDropdown);
