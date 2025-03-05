"use client";
import React from "react";
import { UseFormRegister } from "react-hook-form";

type TProps = {
	label: string;
	register: UseFormRegister<any>;
	required?: boolean;
	placeholder?: string;
};

function ClipboardInput({ label, register, required, placeholder }: TProps) {
	
	
	return (
		<input
			type='text'
			placeholder={placeholder}
			className={classnames.clipboardInput}
			{...register(label, { required: required })}
		/>
	);
}

const classnames = {
	clipboardInput: "h-12 w-[calc(100%-3rem)] px-4 outline-0 ",
};

export default React.memo(ClipboardInput);
