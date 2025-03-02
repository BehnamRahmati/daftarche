"use client";
import React from "react";
import { FiEdit, FiCopy, FiTrash2 } from "react-icons/fi";
export default function ClipboardItem({text} : {text : string}) {

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    }catch(err) {
      console.log("failed to copy to clipboard");
      
    }
  }
	return (
		<div className='flex *:px-5 *:py-3 divide-x divide-gray-200'>
			<div className=' flex-1 truncate'>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab alias rem
				necessitatibus incidunt, sed vel molestias assumenda consequuntur non
				quia, distinctio accusantium. Mollitia, laborum nulla excepturi
				quibusdam quidem et animi.
			</div>
			<div className='w-32 flex items-center gap-2'>
				<FiEdit size={20} />
				<FiCopy onClick={() => handleCopy()} size={20} />
				<FiTrash2 size={20} />
			</div>
		</div>
	);
}
