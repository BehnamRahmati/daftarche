'use client'

import React from 'react'
import { createNewClipboard } from '@/libs/clipboard.actions'
import { RiPlayListAddLine } from 'react-icons/ri'
import { SubmitHandler, useForm } from 'react-hook-form'
import ButtonPaste from '@/components/atoms/ButtonPaste'

type TReq = {
    content: string;
    email: string;
}

export default function ClipboardCreationForm({ email , dictionary}: { email: string, dictionary: any }) {
    const {register , setValue , handleSubmit} = useForm<TReq>()

    const onSubmit : SubmitHandler<TReq> = async (data) => {
        try {
            const clipboard = await createNewClipboard(data)
            console.log(clipboard)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='form-clipboard_creation'>
            <div className='input-wrapper'>
                {/* cloipbord form  input  */}
                <input type='text' {...register('content', {required: true})} placeholder={dictionary.clipboard.form.content} className='text-input'  />
                <input type='text' {...register('email', {required: true})} readOnly hidden name='email' value={email} />
                {/* clipboard form paste button */}
                <ButtonPaste setValue={setValue} />
            </div>

            {/* clipboard form submit button */}
            <button className='button' type='submit'>
                Add to clipboards
                <RiPlayListAddLine size={20} />
            </button>
        </form>
    )
}
