'use client'

import React from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { FiClipboard } from 'react-icons/fi'

function PasteButton({ setValue }: { setValue: UseFormSetValue<any> }) {
    // handling user paste value from clipboard
    const handlePasteFromClipboard = async () => {
        try {
            // Read text from the clipboard
            const text = await navigator.clipboard.readText()
            //set content value from clipboard
            setValue('content', text)
        } catch (err) {
            console.error('Failed to read clipboard contents: ', err)
        }
    }

    return (
        <button onClick={() => handlePasteFromClipboard()} className='leading-0 cursor-pointer p-2 text-[0px]' type='button'>
            paste from clipboard <FiClipboard size={20} />
        </button>
    )
}

export default React.memo(PasteButton)
