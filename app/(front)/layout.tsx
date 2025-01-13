import Navbar from '@/components/Frontend/Navbar'
import MegaMenu from "@/components/Frontend/MegaMenu";

import React, { ReactNode } from 'react'

export default function Layout({children}: {children:ReactNode}) {
  return (
    <div className='bg-blue-600'>
        <Navbar/>
        <div className="max-w-5xl mx-auto py-4 ">
        <MegaMenu />
        </div>
        {children}
    </div>
  )
}
