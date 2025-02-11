import { getAppointments } from '@/actions/appointments';
import ListPanel from '@/components/Dashboard/Doctor/ListPanel';
import PanelHeader from '@/components/Dashboard/Doctor/PanelHeader';
import { CalendarDays } from 'lucide-react';
import React, { ReactNode } from 'react'

export default async function AppointmentLayout({
    children,
}:{
    children:ReactNode;
}){
    const appointments = (await getAppointments()).data||[];
    return (
        <div>
        {/* Header */}
       
         {/* 2 Panels */}
         <div className="grid grid-cols-12">
           {/* List Panel */}
           <div className="col-span-4 py-3 border-r border-gray-100">
            <PanelHeader title="Appointments" 
            count={appointments.length ?? 0} 
            icon={CalendarDays}/>

           <div className="px-3">
            <ListPanel appointments={appointments} />
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