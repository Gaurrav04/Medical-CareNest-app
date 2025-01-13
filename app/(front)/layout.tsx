import Navbar from '@/components/Frontend/Navbar'
import MegaMenu from "@/components/Frontend/MegaMenu";

import React, { ReactNode } from 'react'

export default function Layout({children}: {children:ReactNode}) {
  return (
    <div className="bg-blue-600">
        <Navbar/>
        <div className="bg-white mx-auto py-4 fixed top-20 w-full left-0 z-50 right-0 border-t border-gray-800/10 container">
        <MegaMenu />
        </div>
        {children}
    </div>
  );
}
