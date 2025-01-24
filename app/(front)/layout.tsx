import Navbar from '@/components/Frontend/Navbar'
import MegaMenu from "@/components/Frontend/MegaMenu";

import React, { ReactNode } from 'react'
import Footer from '@/components/Frontend/Footer';

export default function Layout({children}: {children:ReactNode}) {
  return (
    <div className="bg-white">
        <Navbar/>
        <div className="mt-[60px]">{children}</div>
        <Footer/>
    </div>
  );
};
