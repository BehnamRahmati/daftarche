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
			className='text-input'
			{...register(label, { required: required })}
		/>
	);
}


export default React.memo(ClipboardInput);
