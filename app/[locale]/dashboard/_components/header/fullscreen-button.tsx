'use client'
import { GoScreenFull } from "react-icons/go";
import { Button } from '@/components/ui/button'
import React from 'react'
import { goFullscreen } from "@/lib/utils";

export default function FullScreenButton() {

  return (
    <Button variant={'outline'} size={'icon'} onClick={goFullscreen}>
            <GoScreenFull />
            <span className='sr-only'>go back</span>
        </Button>
  )
}
