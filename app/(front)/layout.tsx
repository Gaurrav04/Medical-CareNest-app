import Navbar from '@/components/Frontend/Navbar'
import MegaMenu from "@/components/Frontend/MegaMenu";

import React, { ReactNode } from 'react'
import Footer from '@/components/Frontend/Footer';
import { SiteHeader } from '@/components/site-header';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function Layout({children}: {children:ReactNode}) {
  const session = await getServerSession(authOptions);
  return (
    <div className="">
        <SiteHeader session={session}/>
        {children}
        <Footer/>
    </div>
  );
};
