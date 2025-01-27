import Navbar from '@/components/Frontend/Navbar'
import MegaMenu from "@/components/Frontend/MegaMenu";

import React, { ReactNode } from 'react'
import Footer from '@/components/Frontend/Footer';
import { SiteHeader } from '@/components/site-header';

export default function Layout({children}: {children:ReactNode}) {
  return (
    <div className="">
        <SiteHeader/>
        {children}
        <Footer/>
    </div>
  );
};
