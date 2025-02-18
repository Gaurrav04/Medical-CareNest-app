import { getAppointments, getDoctorAppointments } from '@/actions/appointments';
import { getInboxMessages } from '@/actions/inbox';
import ListPanel from '@/components/Dashboard/Doctor/ListPanel';
import MailListPanel from '@/components/Dashboard/Doctor/MailListPanel';
import PanelHeader from '@/components/Dashboard/Doctor/PanelHeader';
import NotAuthorized from '@/components/NotAuthorized';
import { authOptions } from '@/lib/auth';
import { CalendarDays, Mail } from 'lucide-react';
import { getServerSession } from 'next-auth';
import React, { ReactNode } from 'react'

export default async function AppointmentLayout({
    children,
}:{
    children:ReactNode;
}){
    const session = await getServerSession(authOptions);
    const user = session?.user
    if(user?.role !=="DOCTOR"){
      return (
        <NotAuthorized/>
      )
    }
    const messages = (await getInboxMessages()).data||[];
    return (
        <div>
        {/* Header */}
       
         {/* 2 Panels */}
         <div className="grid grid-cols-12">
           {/* List Panel */}
           <div className="col-span-4 py-3 border-r border-gray-100">
            <PanelHeader title="Inbox Messages" 
            count={messages.length ?? 0} 
            icon={Mail}/>

           <div className="px-3">
            <MailListPanel messages={messages} role={user?.role} />
            </div>
           </div>

        <div className="col-span-8">
           {/* Display Panel */}
           {children}
        </div>
         </div>
    </div>
    );
}