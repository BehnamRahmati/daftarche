"use client";

import React from "react";
import { UseFormSetValue } from "react-hook-form";
import { FiClipboard } from "react-icons/fi";

function ClipboardPasteButton({
	setValue,
}: {
	setValue: UseFormSetValue<any>;
}) {

	
    
    // handling user paste value from clipboard
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

	return (
		<button
			onClick={() => handlePasteFromClipboard()}
			className={classnames.clipboardPasteBtn}
			type='button'
		>
			paste from clipboard <FiClipboard size={20} />
		</button>
	);
}

const classnames = {
	clipboardPasteBtn:
		"bg-gray-100 dark:bg-[var(--foreground)] h-12 w-12 shrink-0 px-3 rounded-xl curspor-pointer text-[0px]",
};


export default React.memo(ClipboardPasteButton)